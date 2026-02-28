import type { ICommentsRepository } from "@/repositories/comments-repository.js";
import type { IPostsRepository } from "@/repositories/posts-repository.js";
import type { Comment } from "@/@types/prisma/client.js";
import { PostNotFoundError } from "../errors/post-not-found-error.js";

interface ListCommentsByPostUseCaseRequest {
  publicId: string;
}

type ListCommentsByPostUseCaseResponse = {
  comments: Comment[];
};

export class ListCommentsByPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private commentsRepository: ICommentsRepository,
  ) {}

  async execute({
    publicId,
  }: ListCommentsByPostUseCaseRequest): Promise<ListCommentsByPostUseCaseResponse> {
    const post = await this.postsRepository.findBy({publicId})
    if (!post) {
        throw new PostNotFoundError()
    }

    const comments = await this.commentsRepository.findByPost(post.id)
    return { comments }
  }
}
