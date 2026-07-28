import { UserRoleRepository } from "@/repositories/user-role-repository";
import { UserRepository } from "@/repositories/user-repository";
import { ClientRepository } from "@/repositories/client-repository";
import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { 
  ImportedProcess, 
  ImportedProcessUpdateDTO
} from "@shared/types/importedProcess";


export class UpdateImportedProcessUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private clientRepository: ClientRepository,
    private importedProcessRepository: ImportedProcessRepository
  ) {}

  async execute(data: ImportedProcessUpdateDTO): Promise<ImportedProcess> {
    
    const userLogged = await this.userRepository.findById(data.userIdLogged)
    if (!userLogged) throw new ResourceNotFoundError();

    const userRole = await this.userRoleRepository.findById(userLogged.roleId)  
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1) throw new UnauthorizedUserError();

    if (data.clientId) {
      const client = await this.clientRepository.findById(data.clientId)
      if (!client) throw new ResourceNotFoundError();
    }

    const importedProcess = await this.importedProcessRepository.findById(data.id)
    if (!importedProcess) throw new ResourceNotFoundError();

    return await this.importedProcessRepository.update(data)
  }
}