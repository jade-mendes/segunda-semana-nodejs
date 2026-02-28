import { makeCreateCommentUseCase } from "@/use-cases/comments/factories/make-create-comment-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userPublicId } = request.user as { sub: string } 
    const createCommentParamsSchema = z.object({
          postPublicId: z.uuid(),
        });
    const { postPublicId } = createCommentParamsSchema.parse(request.params);

    const createCommentBodySchema = z.object({
      content: z.string().trim().min(1).max(100),
    });

    const { content } = createCommentBodySchema.parse(request.body);

    const createCommentUseCase = makeCreateCommentUseCase();

    const { comment } = await createCommentUseCase.execute({
      content,
      postPublicId,
      userPublicId,
    });

    return reply.status(200).send(comment);
  } catch (error) {
    throw error;
  }
}