import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { ListCommentsUseCase } from "../list-comments.js";

export function makeListCommentsUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const listCommentsUseCase = new ListCommentsUseCase(commentsRepository);
  return listCommentsUseCase;
}
