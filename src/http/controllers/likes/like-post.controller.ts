import { LikePresenter } from "@/http/presenters/like-presenter.js";
import { makeLikePostUseCase } from "@/use-cases/likes/factories/make-like-post-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function likePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userPublicId } = request.user as { sub: string };
    const getParamsSchema = z.object({
      postPublicId: z.string(),
    });

    const { postPublicId } = getParamsSchema.parse(request.params);
    const likePostUseCase = makeLikePostUseCase();
    const { like } = await likePostUseCase.execute({
      userPublicId,
      postPublicId,
    });
    return reply.status(200).send(LikePresenter.toHTTP(like));
  } catch (error) {
    throw error;
  }
}
