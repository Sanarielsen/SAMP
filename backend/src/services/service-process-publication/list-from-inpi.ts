import { UserRoleRepository } from "@/repositories/user-role-repository";
import { UserRepository } from "@/repositories/user-repository";
import { ImportedProcessRepository } from "@/repositories/imported-process-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { INPIClient } from "@/scripts/get-process-from-inpi";
import { 
  parsePublicationsFromINPI,
  parseSearchProcessFromINPI
} from "@/utils/parseSearchProcessFromINPI";

import { ProcessPublicationFromINPI } from "@shared/types/processPublication"


export class ListProcessPublicationFromINPIUseCase {
  constructor(
    private userRoleRepository: UserRoleRepository,
    private userRepository: UserRepository,
    private importedProcessRepository: ImportedProcessRepository,
    private INPIparser: INPIClient
  ) {}

  async execute(processNumber: string, userLoggedId: string): Promise<ProcessPublicationFromINPI[]> {

    const userLogged = await this.userRepository.findById(userLoggedId)
    if (!userLogged) throw new ResourceNotFoundError();

    const userRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!userRole) throw new ResourceNotFoundError();
    if (userRole.level > 1) throw new InvalidCredentialsError();

    const importedProcess = await this.importedProcessRepository.findByProcessNumber(processNumber)
    if (!importedProcess) throw new ResourceNotFoundError();

    await this.INPIparser.login();
    const searchHtml = await this.INPIparser.search(processNumber);

    const process = parseSearchProcessFromINPI(searchHtml);
    if (!process) throw new ResourceNotFoundError();

    const detailHtml = await this.INPIparser.detail(process.pedidoNumber);
    
    return parsePublicationsFromINPI(detailHtml);
  }
}