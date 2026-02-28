import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeGetLikeUseCase } from "@/use-cases/likes/factories/make-get-like-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getLike(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const getLikeUseCase = makeGetLikeUseCase();
    const { like } = await getLikeUseCase.execute({ publicId });
    return reply.status(200).send(like);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
