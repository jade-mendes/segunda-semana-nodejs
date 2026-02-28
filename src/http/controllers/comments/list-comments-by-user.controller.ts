import { CommentPresenter } from "@/http/presenters/comment-presenter.js";
import { makeListCommentsByUserUseCase } from "@/use-cases/comments/factories/make-list-comments-by-user-use-case.js";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listCommentsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });
    const { publicId } = getParamsSchema.parse(request.params);
    const listCommentsByUserUseCase = makeListCommentsByUserUseCase();
    const { comments } = await listCommentsByUserUseCase.execute({ publicId });
    return reply.status(200).send(CommentPresenter.toHTTP(comments));
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
