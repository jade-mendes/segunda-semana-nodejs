import type { User } from "@/@types/prisma/client.js";
import type { IUsersRepository } from "@/repositories/users-repository.js";

interface ListUsersUseCaseRequest {
  name?: string;
  page?: number;
  limit?: number;
}

type ListUsersUseCaseResponse = {
  users: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    name,
    page,
    limit,
  }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const {
      data: users,
      totalCount,
      totalPages,
      currentPage,
    } = await this.usersRepository.list({ name, page, limit });
    return { users, totalCount, totalPages, currentPage };
  }
}
