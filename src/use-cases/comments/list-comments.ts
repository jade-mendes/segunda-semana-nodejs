import type { Comment } from "@/@types/prisma/client.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";

type ListCommentsUseCaseResponse = {
  comments: Comment[];
};

export class ListCommentsUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}
  async execute(): Promise<ListCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.list();
    return { comments };
  }
}
