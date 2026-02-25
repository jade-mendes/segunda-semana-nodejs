import { z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import {
  MIN_PASSWORD_SIZE,
  MAX_PASSWORD_SIZE,
} from "@/constants/validation-constants.js";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeAuthenticateUseCase } from "@/use-cases/users/factories/make-authenticate-use-case.js";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateBodySchema = z.object({
      email: z.email(),
      password: z.string().min(MIN_PASSWORD_SIZE).max(MAX_PASSWORD_SIZE),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUserUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        sub: user.publicId,
        role: user.role
      },
      { expiresIn: "1d" },
    );

    return reply.status(200).send({token, user: UserPresenter.toHTTP(user)});
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
  }
}
