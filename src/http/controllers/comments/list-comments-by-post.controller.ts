import { CommentPresenter } from "@/http/presenters/comment-presenter.js";
import { makeListCommentsByPostUseCase } from "@/use-cases/comments/factories/make-list-comments-by-post-use-case.js";
import { PostNotFoundError } from "@/use-cases/errors/post-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listCommentsByPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });
    const { publicId } = getParamsSchema.parse(request.params);
    const listCommentsByPostUseCase = makeListCommentsByPostUseCase();
    const { comments } = await listCommentsByPostUseCase.execute({ publicId });
    return reply.status(200).send(CommentPresenter.toHTTP(comments));
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
