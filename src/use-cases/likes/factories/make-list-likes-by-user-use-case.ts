import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { ListLikesByUserUseCase } from "../list-likes-by-user.js";
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository.js";

export function makeListLikesByUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const likesRepository = new PrismaLikesRepository();
  const listLikesByUserUseCase = new ListLikesByUserUseCase(
    usersRepository,
    likesRepository,
  );
  return listLikesByUserUseCase;
}
