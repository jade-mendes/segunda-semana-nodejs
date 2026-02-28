import type { Like } from "@/@types/prisma/client.js";
import type { ILikesRepository } from "@/repositories/likes-repository.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface ListLikesByCommentUseCaseRequest {
  publicId: string;
}

type ListLikesByCommentUseCaseResponse = {
  likes: Like[];
};

export class ListLikesByCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private likesRepository: ILikesRepository,
  ) {}

  async execute({
    publicId,
  }: ListLikesByCommentUseCaseRequest): Promise<ListLikesByCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findBy({ publicId });
    if (!comment) {
      throw new ResourceNotFoundError();
    }

    const likes = await this.likesRepository.findByComment(comment.id);
    return { likes };
  }
}
