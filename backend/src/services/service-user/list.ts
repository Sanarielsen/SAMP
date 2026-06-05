import { UsersRepository } from "@/repositories/users-repository";
import { UserRoleRepository } from "@/repositories/user-role-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { UserPublicDTO } from "@shared/types/user";


interface ListUserUseCaseRequest {
  id: string
  search: string
}


export class ListUserUseCase {
  constructor(
    private userRepository: UsersRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute({
    id,
    search
  }: ListUserUseCaseRequest): Promise<UserPublicDTO[]> {

    const userLogged = await this.userRepository.findById(id)

    if (!userLogged) {
      throw new NonExistUserError();
    }

    const roleUser = await this.userRoleRepository.findById(userLogged.roleId)

    if (!roleUser) {
      throw new ResourceNotFoundError();
    }

    if (roleUser.level !== 1) {
      throw new UnauthorizedUserError();
    }

    return await this.userRepository.findBySearch(search)
  }
}