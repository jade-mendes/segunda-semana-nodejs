import type { ILikesRepository } from "@/repositories/likes-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import type { Like } from "@/@types/prisma/client.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface LikeCommentUseCaseRequest {
  userPublicId: string;
  commentPublicId: string;
}

type LikeCommentUseCaseResponse = {
  like: Like;
};

export class LikeCommentUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private commentsRepository: ICommentsRepository,
    private likesRepository: ILikesRepository,
  ) {}

  async execute({
    userPublicId,
    commentPublicId,
  }: LikeCommentUseCaseRequest): Promise<LikeCommentUseCaseResponse> {
    try {
      const user = await this.usersRepository.findBy({
        publicId: userPublicId,
      });
      if (!user) {
        throw new UserNotFoundError();
      }
      const comment = await this.commentsRepository.findBy({
        publicId: commentPublicId,
      });
      if (!comment) {
        throw new ResourceNotFoundError();
      }

      const like = await this.likesRepository.create({
        userId: user.id,
        commentId: comment.id,
      });
      return { like };
      
    } catch (error) {
      throw error;
    }
  }
}
