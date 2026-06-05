import { hash } from "bcryptjs"

import { sendRegisterEmail } from "@/lib/mailer_send"

import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists"
import { UserRoleRepository } from "@/repositories/user-role-repository"

import { User, UserPublicDTO } from "@shared/types/user"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
  roleId: string,
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute({
    name,
    email,
    password,
    roleId,
  }: RegisterUseCaseRequest): Promise<User> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    
    const userRole = await this.userRoleRepository.findById(roleId)

    if (!userRole) {
      throw new ResourceNotFoundError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      roleId
    });

    sendRegisterEmail()

    return user
  }
}
