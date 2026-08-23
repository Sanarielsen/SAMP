import { ImportedProcessRepository } from "@/repositories/imported-process";
import { UserRepository } from "@/repositories/user";
import { UserRoleRepository } from "@/repositories/user-role";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export class DeleteImportedProcessUseCase {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository,
    private importedProcessRepository: ImportedProcessRepository,
  ) {}

  async execute(id: string, userLoggedId: string): Promise<void> {

    const userLogged = await this.userRepository.findById(userLoggedId)
    if (!userLogged) throw new ResourceNotFoundError();
    
    const userLoggedRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!userLoggedRole) throw new ResourceNotFoundError();
    if (userLoggedRole.level > 1) throw new UnauthorizedUserError();
    
    const importedProcessWillBeDeleted = await this.importedProcessRepository.findById(id);
    if (!importedProcessWillBeDeleted) throw new ResourceNotFoundError();

    await this.importedProcessRepository.delete(id);
  }
}