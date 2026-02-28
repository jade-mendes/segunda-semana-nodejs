import type { Comment } from "@/@types/prisma/client.js";

type HTTPComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CommentPresenter {
  static toHTTP(comment: Comment): HTTPComment;
  static toHTTP(comments: Comment[]): HTTPComment[];
  static toHTTP(input: Comment | Comment[]): HTTPComment | HTTPComment[] {
    if (Array.isArray(input)) {
      return input.map((comment) => this.toHTTP(comment));
    }

    return {
      id: input.publicId,
      content: input.content,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
}
