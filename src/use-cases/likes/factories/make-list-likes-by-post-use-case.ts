import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { ListLikesByPostUseCase } from "../list-likes-by-post.js";

export function makeListLikesByPostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const likesRepository = new PrismaLikesRepository();
  const listLikesByPostUseCase = new ListLikesByPostUseCase(
    postsRepository,
    likesRepository,
  );
  return listLikesByPostUseCase;
}
