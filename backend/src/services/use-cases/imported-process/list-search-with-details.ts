import { UserRoleRepository } from "@/repositories/user-role";
import { UserRepository } from "@/repositories/user";
import { ImportedProcessRepository } from "@/repositories/imported-process";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { ImportedProcess } from "@shared/types/importedProcess";


export class ListImportedProcessSearchWithDetailsUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private importedProcessRepository: ImportedProcessRepository,
  ) {}

  async execute(search: string, userLoggedId: string): Promise<ImportedProcess[] | null> {
    
    const userLogged = await this.userRepository.findById(userLoggedId)
    if (!userLogged) throw new ResourceNotFoundError();

    const currentUserRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!currentUserRole) throw new ResourceNotFoundError();

    return await this.importedProcessRepository.findManyDetailsWithSearch(search)
  }
}