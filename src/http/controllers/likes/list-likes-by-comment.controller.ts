import { LikePresenter } from "@/http/presenters/like-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeListLikesByCommentUseCase } from "@/use-cases/likes/factories/make-list-likes-by-comment-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listLikesByComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });
    const { publicId } = getParamsSchema.parse(request.params);
    const listLikesByCommentUseCase = makeListLikesByCommentUseCase();
    const { likes } = await listLikesByCommentUseCase.execute({ publicId });
    return reply.status(200).send(LikePresenter.toHTTP(likes));
    
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
