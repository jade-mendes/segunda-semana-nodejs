import type { Comment } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import { PostNotFoundError } from "../errors/post-not-found-error.js";

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
        throw new UserNotFoundError();
      }

      const post = await this.postsRepository.findBy({
        publicId: postPublicId,
      });

      if (!post) {
        throw new PostNotFoundError();
      }

      const comment = await this.commentsRepository.create({
        content,
        postId: post.id,
        userId: user.id,
      });

      return { comment };
    } catch (error) {
      throw error;
    }
  }
}
