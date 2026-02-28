import { LikePresenter } from "@/http/presenters/like-presenter.js";
import { makeLikeCommentUseCase } from "@/use-cases/likes/factories/make-like-comment-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function likeComment(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userPublicId } = request.user as { sub: string };
    const getParamsSchema = z.object({
      commentPublicId: z.string(),
    });

    const { commentPublicId } = getParamsSchema.parse(request.params);
    const likeCommentUseCase = makeLikeCommentUseCase();
    const { like } = await likeCommentUseCase.execute({
      userPublicId,
      commentPublicId,
    });
    return reply.status(200).send(LikePresenter.toHTTP(like));
  } catch (error) {
    throw error;
  }
}
