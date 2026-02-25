import type { User } from "@/@types/prisma/client.js"
import type { IUsersRepository } from "@/repositories/users-repository.js"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js"
import { compare } from "bcryptjs"

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

type AuthenticateUseCaseResponse = {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)
        
        if(!user) {
            throw new InvalidCredentialsError()
        }
        
        const doesPasswordMatches = await compare(password, user.passwordHash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}