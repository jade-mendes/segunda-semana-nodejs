import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { DeleteLikeUseCase } from "../delete-like.js";

export function makeDeleteLikeUseCase() {
  const likesRepository = new PrismaLikesRepository();
  const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository);
  return deleteLikeUseCase;
}
