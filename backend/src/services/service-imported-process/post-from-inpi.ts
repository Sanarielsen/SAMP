import { UserRoleRepository } from "@/repositories/user-role-repository";
import { UserRepository } from "@/repositories/user-repository";
import { ClientRepository } from "@/repositories/client-repository";
import { ImportedProcessRepository } from "@/repositories/imported-process-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { 
  ImportedProcess,
  ImportedProcessCreateDTO
} from "@shared/types/importedProcess";


export class PostImportedProcessFromINPIUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private clientRepository: ClientRepository,
    private importedProcessRepository: ImportedProcessRepository
  ) {}

  async execute(data: ImportedProcessCreateDTO): Promise<ImportedProcess> {
    
    const userResponsable = await this.userRepository.findById(data.userIdLogged)
    if (!userResponsable) throw new ResourceNotFoundError();

    const currentUserRole = await this.userRoleRepository.findById(userResponsable.roleId)
    if (!currentUserRole) throw new ResourceNotFoundError();
    if (currentUserRole.level > 1) throw new UnauthorizedUserError();

    const client = await this.clientRepository.findById(data.clientId)
    if (!client) throw new ResourceNotFoundError();

    return this.importedProcessRepository.create(data)
  }
}