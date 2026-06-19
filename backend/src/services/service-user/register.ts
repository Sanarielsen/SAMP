import { hash } from "bcryptjs"

import { sendRegisterEmail } from "@/lib/mailer_send"

import { UserRepository } from "@/repositories/user-repository"
import { UserRoleRepository } from "@/repositories/user-role-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

import { User } from "@shared/types/user"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
  roleId: string,
}

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute({
    name,
    email,
    password,
    roleId,
  }: RegisterUseCaseRequest): Promise<User> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    
    const userRole = await this.userRoleRepository.findById(roleId)

    if (!userRole) {
      throw new ResourceNotFoundError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      roleId
    });

    sendRegisterEmail()

    return user
  }
}
