import type { Prisma, Comment } from "@/@types/prisma/client.js";

export interface ICommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  findBy(where: Prisma.CommentWhereInput): Promise<Comment | null>;
  findByUser(id: number): Promise<Comment[]>;
  list(): Promise<Comment[]>;
  delete(id: number): Promise<void>;
  update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment>;
}
