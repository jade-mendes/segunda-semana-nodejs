import { CommentPresenter } from "@/http/presenters/comment-presenter.js";
import { makeListCommentsUseCase } from "@/use-cases/comments/factories/make-list-comments-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function listComments(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const listCommentsUseCase = makeListCommentsUseCase();
    const { comments } = await listCommentsUseCase.execute();
    return reply.status(200).send(CommentPresenter.toHTTP(comments));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error;
  }
}
