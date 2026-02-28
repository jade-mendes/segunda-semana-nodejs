import type { Like } from "@/@types/prisma/client.js";
import type { ILikesRepository } from "@/repositories/likes-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";

interface ListLikesByUserUseCaseRequest {
  publicId: string;
}

type ListLikesByUserUseCaseResponse = {
  likes: Like[];
};

export class ListLikesByUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private likesRepository: ILikesRepository,
  ) {}

  async execute({
      publicId,
    }: ListLikesByUserUseCaseRequest): Promise<ListLikesByUserUseCaseResponse> {
      const user = await this.usersRepository.findBy({ publicId });
      if (!user) {
        throw new UserNotFoundError();
      }
  
      const likes = await this.likesRepository.findByUser(user.id);
      return { likes }
    }
}
