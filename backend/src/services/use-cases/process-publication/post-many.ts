import { UserRoleRepository } from "@/repositories/user-role-repository";
import { UserRepository } from "@/repositories/user-repository";
import { ImportedProcessRepository } from "@/repositories/imported-process-repository";
import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { ProcessPublicationCreateFromINPIDTO } from "@shared/types/processPublication";


export class PostManyProcessPublicationUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private importedProcessRepository: ImportedProcessRepository,
    private processPublicationRepository: ProcessPublicationRepository
  ) {}

  async execute(data: ProcessPublicationCreateFromINPIDTO): Promise<number> {

    const userLogged = await this.userRepository.findById(data.createdByUser)
    if (!userLogged) throw new ResourceNotFoundError();

    const userRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1) throw new UnauthorizedUserError();

    const importedProcess = await this.importedProcessRepository.findById(data.importedProcessId)
    if (!importedProcess) throw new ResourceNotFoundError();

    const insertedPublications = await this.processPublicationRepository.createMany(data)

    return insertedPublications
  }
}