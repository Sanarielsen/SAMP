import { UserRoleRepository } from "@/repositories/user-role";
import { UserRepository } from "@/repositories/user";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export class DeleteUserUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository
  ) {}

  async execute( userLoggedId: string, userWillBeDeleted: string ): Promise<void> {

    const user = await this.userRepository.findById(userWillBeDeleted)
    if (!user) throw new ResourceNotFoundError();

    const userLogged = await this.userRepository.findById(userLoggedId)
    if (!userLogged) throw new ResourceNotFoundError();

    const userRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1) throw new UnauthorizedUserError();

    await this.userRepository.delete(userWillBeDeleted)
  }
}