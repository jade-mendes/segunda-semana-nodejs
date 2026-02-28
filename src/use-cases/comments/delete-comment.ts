import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteCommentUseCaseRequest {
  publicId: string;
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}
  async execute({ publicId }: DeleteCommentUseCaseRequest) {
    const comment = await this.commentsRepository.findBy({ publicId });
    if (!comment) {
      throw new ResourceNotFoundError();
    }
    await this.commentsRepository.delete(comment.id);
  }
}
