import { makeDeleteCommentUseCase } from "@/use-cases/comments/factories/make-delete-comment-use-case.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.uuid(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const deleteCommentUseCase = makeDeleteCommentUseCase();
    await deleteCommentUseCase.execute({ publicId });
    return reply
      .status(200)
      .send({ message: "Comentário apagado com sucesso!" });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
