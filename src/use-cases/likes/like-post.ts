import type { ILikesRepository } from "@/repositories/likes-repository.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";
import type { Like } from "@/@types/prisma/client.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import { PostNotFoundError } from "../errors/post-not-found-error.js";

interface LikePostUseCaseRequest {
  userPublicId: string;
  postPublicId: string;
}

type LikePostUseCaseResponse = {
  like: Like;
};

export class LikePostUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private postsRepository: IPostsRepository,
    private likesRepository: ILikesRepository,
  ) {}

  async execute({
    userPublicId,
    postPublicId,
  }: LikePostUseCaseRequest): Promise<LikePostUseCaseResponse> {
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

      const like = await this.likesRepository.create({
        userId: user.id,
        postId: post.id,
      });
      return { like };
      
    } catch (error) {
      throw error;
    }
  }
}
