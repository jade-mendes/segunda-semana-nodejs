import type { ILikesRepository } from "@/repositories/likes-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteLikeUseCaseRequest {
  publicId: string;
}

export class DeleteLikeUseCase {
  constructor(private likesRepository: ILikesRepository) {}
  async execute({ publicId }: DeleteLikeUseCaseRequest) {
    const like = await this.likesRepository.findBy({ publicId });
    if (!like) {
      throw new ResourceNotFoundError();
    }
    await this.likesRepository.delete(like.id);
  }
}
