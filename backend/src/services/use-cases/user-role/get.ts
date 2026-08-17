import { UserRepository } from "@/repositories/user-repository";
import { UserRoleRepository } from "@/repositories/user-role-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { UserRole } from "@shared/types/userRole"
import { NonExistUserError } from "@/services/errors/non-exist-user-error";

interface GetUserRoleUseCaseRequest {
  userId: string
}

type GetUserRoleUseCaseResponse = UserRole[] | null

export class GetUserRoleUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    userId
  }: GetUserRoleUseCaseRequest): Promise<GetUserRoleUseCaseResponse> {

    const userLogged = await this.userRepository.findById(userId)

    if (!userLogged) {
      throw new NonExistUserError()
    }

    const userRole = await this.userRoleRepository.findById(userLogged.roleId)

    if (!userRole) {
      throw new InvalidCredentialsError()
    }

    const userRolesAvaiables = await this.userRoleRepository.findManyByLevelGreaterThanOrEqual(userRole.level, userLogged.joker)

    return userRolesAvaiables
  }
}