import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { DeletePostUseCase } from "../delete-post.js";

export function makeDeletePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const deletePostUseCase = new DeletePostUseCase(postsRepository);
  return deletePostUseCase;
}
