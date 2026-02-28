import type { Prisma, User } from "@/@types/prisma/client.js";
import type { ListUsersQuery, ListUsersResponse } from "@/interfaces/users.js";

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findBy(where: Prisma.UserWhereInput): Promise<User | null>;
  list(query: ListUsersQuery): Promise<ListUsersResponse>;
  delete(id: number): Promise<void>;
  update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
}
