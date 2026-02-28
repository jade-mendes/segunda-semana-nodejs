import type { Like } from "@/@types/prisma/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { ILikesRepository } from "@/repositories/likes-repository.js";

interface GetLikeUseCaseRequest {
  publicId: string;
}

type GetLikeUseCaseResponse = {
  like: Like;
};

export class GetLikeUseCase {
  constructor(private likesRepository: ILikesRepository) {}

  async execute({
    publicId,
  }: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
    const like = await this.likesRepository.findBy({ publicId });
    if (!like) {
      throw new ResourceNotFoundError();
    }
    return { like };
  }
}
