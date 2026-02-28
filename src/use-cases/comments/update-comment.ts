import type { Comment } from "@/@types/prisma/client.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface UpdateCommentUseCaseRequest {
  publicId: string;
  content: string;
}

type UpdateCommentUseCaseResponse = {
  comment: Comment;
};

export class UpdateCommentUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute({
    publicId,
    content,
  }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
    const commentToUpdate = await this.commentsRepository.findBy({ publicId });
    if (!commentToUpdate) {
      throw new ResourceNotFoundError();
    }
    const comment = await this.commentsRepository.update(commentToUpdate.id, {
      content,
    });

    return { comment };
  }
}
