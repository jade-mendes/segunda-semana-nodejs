import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { ILikesRepository } from "../likes-repository.js";

export class PrismaLikesRepository implements ILikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput) {
    return await prisma.like.create({ data });
  }

  async delete(id: number) {
    await prisma.like.delete({
      where: { id },
    });
  }

  async findBy(where: Prisma.LikeWhereInput) {
    return await prisma.like.findFirst({ where });
  }

  async update(id: number, data: Prisma.LikeUpdateInput) {
    return await prisma.like.update({
      where: { id },
      data,
    });
  }

  async findByUser(id: number) {
    return await prisma.like.findMany({
      where: { userId: id },
    });
  }

  async findByPost(id: number) {
    return await prisma.like.findMany({
      where: { postId: id },
    });
  }

  async findByComment(id: number) {
    return await prisma.like.findMany({
      where: { commentId: id },
    });
  }
}
