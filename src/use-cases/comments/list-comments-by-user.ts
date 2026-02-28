import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import type { Comment } from "@/@types/prisma/client.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";

interface ListCommentsByUserUseCaseRequest {
  publicId: string;
}

type ListCommentsByUserUseCaseResponse = {
  comments: Comment[];
};

export class ListCommentsByUserUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    publicId,
  }: ListCommentsByUserUseCaseRequest): Promise<ListCommentsByUserUseCaseResponse> {
    const user = await this.usersRepository.findBy({ publicId });
    if (!user) {
      throw new UserNotFoundError();
    }

    const comments = await this.commentsRepository.findByUser(user.id)
    return { comments }
  }
}
