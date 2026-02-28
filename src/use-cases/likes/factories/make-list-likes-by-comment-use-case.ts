import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository.js";
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { ListLikesByCommentUseCase } from "../list-likes-by-comment.js";

export function makeListLikesByCommentUseCase() {
  const commentsRepository = new PrismaCommentsRepository();
  const likesRepository = new PrismaLikesRepository();
  const listLikesByCommentUseCase = new ListLikesByCommentUseCase(
    commentsRepository,
    likesRepository,
  );
  return listLikesByCommentUseCase;
}
