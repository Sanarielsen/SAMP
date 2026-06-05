import { hash } from "bcryptjs"

import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists"
import { UserRoleRepository } from "@/repositories/user-role-repository"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"
import { User } from "@shared/types/user"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const roleIDStarter = await this.userRoleRepository.findByName("USER")

    if (!roleIDStarter) {
      throw new ResourceNotFoundError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      roleId: roleIDStarter.id,
    });

    return {
      user,
    };
  }
}
