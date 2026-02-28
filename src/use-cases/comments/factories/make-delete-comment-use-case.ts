import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { DeleteCommentUseCase } from "../delete-comment.js";

export function makeDeleteCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);
  return deleteCommentUseCase;
}
