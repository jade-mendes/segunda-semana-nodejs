import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { ListCommentsByPostUseCase } from "../list-comments-by-post.js";

export function makeListCommentsByPostUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const postsRepository = new PrismaPostsRepository();
  const listCommentsByPostUseCase = new ListCommentsByPostUseCase(
    postsRepository,
    commentsRepository
  );
  return listCommentsByPostUseCase;
}
