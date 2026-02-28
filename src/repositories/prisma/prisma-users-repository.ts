import type { Prisma } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "../users-repository.js";
import { prisma } from "@/libs/prisma.js";
import type { ListUsersQuery, ListUsersResponse } from "@/interfaces/users.js";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });
  }

  async findBy(where: Prisma.UserWhereInput) {
    return await prisma.user.findFirst({ where });
  }

  async list({
    name,
    page = 1,
    limit = 5,
  }: ListUsersQuery): Promise<ListUsersResponse> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      name: name
        ? {
            contains: name,
            mode: "insensitive",
          }
        : undefined,
    };

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ createdAt: "desc" }],
    });

    const totalCount = await prisma.user.count({ where });
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: users,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}
