import { compare } from "bcryptjs";

import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { User, UserDetailDTO } from "@shared/types/user";
import { UserRoleRepository } from "@/repositories/user-role-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


interface AuthenticateUseCaseRequest {
  email: string,
  password: string
}

export class AuthenticateUseCase{
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute({
    email, password
  }: AuthenticateUseCaseRequest): Promise<UserDetailDTO> {

    const user = await this.userRepository.findAuthByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash!)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    const userLogged = await this.userRepository.findById(user.id)
    const userRole =  await this.userRoleRepository.findById(user.roleId)

    if (!userLogged || !userRole) {
      throw new ResourceNotFoundError();
    }

    return {
      ...userLogged,
      userRole: userRole
    }
  }
}