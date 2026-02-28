import type { Comment } from "@/@types/prisma/client.js";

type HTTPComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CommentPresenter {
  static toHTTP(post: Comment): HTTPComment;
  static toHTTP(posts: Comment[]): HTTPComment[];
  static toHTTP(input: Comment | Comment[]): HTTPComment | HTTPComment[] {
    if (Array.isArray(input)) {
      return input.map((post) => this.toHTTP(post));
    }

    return {
      id: input.publicId,
      content: input.content,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
}
