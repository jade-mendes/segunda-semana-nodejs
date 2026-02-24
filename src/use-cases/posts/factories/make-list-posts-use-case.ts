import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository.js";
import { ListPostsUseCase } from "../list-posts.js";

export function makeListPostsUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const listPostsUseCase = new ListPostsUseCase(postsRepository)
    return listPostsUseCase
}