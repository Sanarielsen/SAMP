import { UserRoleRepository } from "@/repositories/user-role-repository";
import { UserRepository } from "@/repositories/user-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { UserPasswordUpdateDTO } from "@shared/types/user";


export class UpdateUserPasswordUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: UserPasswordUpdateDTO): Promise<void> {

    if (data.password !== data.confirm) throw new InvalidCredentialsError();
    
    const user = await this.userRepository.findById(data.id);
    if (!user) throw new ResourceNotFoundError();

    const userLogged = await this.userRepository.findById(data.userLoggedId);
    if (!userLogged) throw new ResourceNotFoundError();

    const userRole = await this.userRoleRepository.findById(userLogged.roleId);
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1 && data.userLoggedId !== data.id) {
      throw new UnauthorizedUserError();
    }

    await this.userRepository.updatePassword(data)
  }
}