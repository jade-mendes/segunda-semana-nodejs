import type { Comment } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";

interface CreateCommentUseCaseRequest {
  content: string;
  postPublicId: string;
  userPublicId: string;
}

type CreateCommentUseCaseResponse = {
  comment: Comment;
};

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    content,
    postPublicId,
    userPublicId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    try {
      const user = await this.usersRepository.findBy({
        publicId: userPublicId,
      });

      if (!user) {
        throw new ResourceNotFoundError();
      }

      const post = await this.postsRepository.findBy({
        publicId: postPublicId,
      });

      if (!post) {
        throw new ResourceNotFoundError();
      }

      const comment = await this.commentsRepository.create({
        content,
        postId: post.id,
        userId: user.id
      });

      return { comment };
    } catch (error) {
      throw error;
    }
  }
}
