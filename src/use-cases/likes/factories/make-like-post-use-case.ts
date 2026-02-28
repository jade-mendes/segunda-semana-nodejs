import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { LikePostUseCase } from "../like-post.js";

export function makeLikePostUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const postsRepository = new PrismaPostsRepository();
  const likesRepository = new PrismaLikesRepository();
  const likePostUseCase = new LikePostUseCase(
    usersRepository,
    postsRepository,
    likesRepository,
  );
  return likePostUseCase;
}
