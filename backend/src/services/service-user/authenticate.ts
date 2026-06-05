import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { User, UserAuthenticated } from "@shared/types/user";

import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}

interface AuthenticateUseCaseResponse {
  user: UserAuthenticated
}

export class AuthenticateUseCase{
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email, password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user
    }
  }
}