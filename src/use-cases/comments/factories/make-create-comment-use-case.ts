import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { CreateCommentUseCase } from "../create-comment.js";

export function makeCreateCommentUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const postsRepository = new PrismaPostsRepository();
  const commentsRepository = new PrismaCommentsRepository();

  const createCommentUseCase = new CreateCommentUseCase(
    commentsRepository,
    postsRepository,
    usersRepository,
  );
  
  return createCommentUseCase;
}
