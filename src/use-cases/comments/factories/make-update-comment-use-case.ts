import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { UpdateCommentUseCase } from "../update-comment.js";

export function makeUpdateCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository);
  return updateCommentUseCase;
}
