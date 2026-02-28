import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { LikeCommentUseCase } from "../like-comment.js";

export function makeLikeCommentUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const commentsRepository = new PrismaCommentsRepository();
  const likesRepository = new PrismaLikesRepository();
  const likeCommentUseCase = new LikeCommentUseCase(
    usersRepository,
    commentsRepository,
    likesRepository,
  );
  return likeCommentUseCase;
}
