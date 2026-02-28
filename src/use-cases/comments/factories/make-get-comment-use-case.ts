import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { GetCommentUseCase } from "../get-comment.js";

export function makeGetCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const getCommentUseCase = new GetCommentUseCase(commentsRepository);
  return getCommentUseCase;
}
