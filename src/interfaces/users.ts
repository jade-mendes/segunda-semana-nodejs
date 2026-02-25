import type { User } from "@/@types/prisma/client.js"

export interface ListUsersQuery {
    name?: string
    page?: number
    limit?: number
}

export interface ListUsersResponse {
    data: User[]
    totalCount: number
    totalPages: number
    currentPage: number
}