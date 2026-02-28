import { CommentPresenter } from "@/http/presenters/comment-presenter.js";
import { makeGetCommentUseCase } from "@/use-cases/comments/factories/make-get-comment-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getComment(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });
    const { publicId } = getParamsSchema.parse(request.params);

    const getCommentUseCase = makeGetCommentUseCase();
    const { comment } = await getCommentUseCase.execute({ publicId });
    return reply.status(200).send(CommentPresenter.toHTTP(comment));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
