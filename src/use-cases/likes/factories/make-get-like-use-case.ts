import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";
import { GetLikeUseCase } from "../get-like.js";

export function makeGetLikeUseCase() {
  const likesRepository = new PrismaLikesRepository();
  const getLikeUseCase = new GetLikeUseCase(likesRepository);
  return getLikeUseCase;
}
