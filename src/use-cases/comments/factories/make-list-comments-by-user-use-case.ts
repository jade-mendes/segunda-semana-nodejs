import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { ListCommentsByUserUseCase } from "../list-comments-by-user.js";

export function makeListCommentsByUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const commentsRepository = new PrismaCommentsRepository();
  const listCommentsByUserUseCase = new ListCommentsByUserUseCase(
    commentsRepository,
    usersRepository,
  );
  return listCommentsByUserUseCase;
}
