import type { FastifyRequest, FastifyReply } from "fastify";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeListUsersUseCase } from "@/use-cases/users/factories/make-list-users-use-case.js";
import z from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listMoviesQuerySchema = z.object({
      name: z.string().optional(),
      page: z.number().optional(),
      limit: z.number().optional(),
    });

    const { name, page, limit } = listMoviesQuerySchema.parse(request.query);

    const listUsersUseCase = makeListUsersUseCase();

    const { users, totalCount, totalPages, currentPage } =
      await listUsersUseCase.execute({ name, page, limit });

    return reply.status(200).send({
      users: UserPresenter.toHTTP(users),
      totalCount,
      totalPages,
      currentPage,
    });
  } catch (error) {
    throw error;
  }
}
