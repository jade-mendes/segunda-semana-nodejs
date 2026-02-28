import { LikePresenter } from "@/http/presenters/like-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeListLikesByPostUseCase } from "@/use-cases/likes/factories/make-list-likes-by-post-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function listLikesByPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getParamsSchema = z.object({
      publicId: z.string(),
    });
    const { publicId } = getParamsSchema.parse(request.params);
    const listLikesByPostUseCase = makeListLikesByPostUseCase();
    const { likes } = await listLikesByPostUseCase.execute({ publicId });
    return reply.status(200).send(LikePresenter.toHTTP(likes));
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
