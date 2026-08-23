import { UserRoleRepository } from "@/repositories/user-role";
import { UserRepository } from "@/repositories/user";
import { ImportedProcessRepository } from "@/repositories/imported-process";
import { ProcessPublicationRepository } from "@/repositories/process-publication";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { ProcessPublication, ProcessPublicationUpdateDTO } from "@shared/types/processPublication";


export class UpdateProcessPublicationUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private importedProcessRepository: ImportedProcessRepository,
    private processPublicationRepository: ProcessPublicationRepository,
  ) {}

  async execute(data: ProcessPublicationUpdateDTO): Promise<ProcessPublication> {

    const userLogged = await this.userRepository.findById(data.updatedByUser);
    if (!userLogged) throw new ResourceNotFoundError();
    
    const userRole = await this.userRoleRepository.findById(userLogged.roleId);
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1) throw new UnauthorizedUserError();

    if (data.importedProcessId) {
      const importedProcess = await this.importedProcessRepository.findById(data.importedProcessId);
      if (!importedProcess) {
        throw new ResourceNotFoundError();
      }
    }

    const processPublication = await this.processPublicationRepository.findById(data.id);
    if (!processPublication) {
      throw new ResourceNotFoundError();
    }

    return this.processPublicationRepository.update(data);
  }
}