import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeleteLikeUseCase } from "@/use-cases/likes/factories/make-delete-like-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getParamsSchema = z.object({
      publicId: z.uuid(),
    });

    const { publicId } = getParamsSchema.parse(request.params);
    const deleteLikeUseCase = makeDeleteLikeUseCase();
    await deleteLikeUseCase.execute({publicId});
    return reply.status(200).send({ message: "Like removido com sucesso!" });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
