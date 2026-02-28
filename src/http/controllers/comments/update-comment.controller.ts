import { CommentPresenter } from "@/http/presenters/comment-presenter.js";
import { makeUpdateCommentUseCase } from "@/use-cases/comments/factories/make-update-comment-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updateComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const updateBodySchema = z.object({
      content: z.string().trim().min(1).max(256),
    });
    const { content } = updateBodySchema.parse(request.body);

    const updateCommentUseCase = makeUpdateCommentUseCase();
    const { comment } = await updateCommentUseCase.execute({
      publicId,
      content,
    });

    return reply.status(200).send(CommentPresenter.toHTTP(comment));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
