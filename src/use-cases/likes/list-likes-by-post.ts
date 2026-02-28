import type { ILikesRepository } from "@/repositories/likes-repository.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import type { Like } from "@/@types/prisma/client.js";
import { PostNotFoundError } from "../errors/post-not-found-error.js";

interface LisLikesByPostUseCaseRequest {
  publicId: string;
}

type ListLikesByPostUseCaseResponse = {
  likes: Like[];
};

export class ListLikesByPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private likesRepository: ILikesRepository,
  ) {}

  async execute({
    publicId,
  }: LisLikesByPostUseCaseRequest): Promise<ListLikesByPostUseCaseResponse> {
    const post = await this.postsRepository.findBy({ publicId });
    if (!post) {
      throw new PostNotFoundError();
    }

    const likes = await this.likesRepository.findByPost(post.id);
    return { likes };
  }
}
