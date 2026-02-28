import type { Comment } from "@/@types/prisma/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";

interface GetCommentUseCaseRequest {
  publicId: string;
}

type GetCommentUseCaseResponse = {
  comment: Comment;
};

export class GetCommentUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute({
    publicId,
  }: GetCommentUseCaseRequest): Promise<GetCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findBy({ publicId });
    if (!comment) {
      throw new ResourceNotFoundError();
    }
    return { comment };
  }
}
