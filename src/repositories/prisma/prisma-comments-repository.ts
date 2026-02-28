import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { ICommentsRepository } from "../comments-repository.js";

export class PrismaCommentsRepository implements ICommentsRepository {
    async create(data: Prisma.CommentUncheckedCreateInput) {
        return await prisma.comment.create({data})
    }

    async list() {
        return await prisma.comment.findMany()
    }

    async delete(id: number) {
        await prisma.comment.delete({
            where: {id}
        })
    }

    async findBy(where: Prisma.CommentWhereInput){
        return await prisma.comment.findFirst({where});
    }

    async update(id: number, data: Prisma.CommentUpdateInput) {
        return await prisma.comment.update({
            where: {id},
            data
        })
    }

    async findByUser(id: number) {
        return await prisma.comment.findMany({
            where: {userId: id}
        })
    }
}