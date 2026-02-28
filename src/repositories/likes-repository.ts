import type { Prisma, Like } from "@/@types/prisma/client.js";

export interface ILikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>;
  findBy(where: Prisma.LikeWhereInput): Promise<Like | null>;
  findByUser(id: number): Promise<Like[]>;
  findByPost(id: number): Promise<Like[]>;
  findByComment(id: number): Promise<Like[]>;
  delete(id: number): Promise<void>;
  update(id: number, data: Prisma.LikeUpdateInput): Promise<Like>;
}