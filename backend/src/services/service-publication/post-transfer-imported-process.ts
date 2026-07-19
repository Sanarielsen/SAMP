import { PublicationRepository } from "@/repositories/publication-repository";
import { ImportedProcessRepository } from "@/repositories/process-imported-repository";
import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";
import { ClientRepository } from "@/repositories/client-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  Publication,
  CreatePublicationDTO, 
  CreatePublicationTransferImportedProcessDTO, 
} from "@shared/types/publication";


export class PostPublicationTransferImportedProcessUseCase {
  constructor(
    private publicationRepository: PublicationRepository,
    private processImportedRepository: ImportedProcessRepository,
    private processHistoryRepository: ProcessHistoricRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(data: CreatePublicationTransferImportedProcessDTO): Promise<Publication> {

    const client = await this.clientRepository.findById(data.clientId)
    if (!client) {
      throw new ResourceNotFoundError()
    }

    const processHistory = await this.processHistoryRepository.findById(data.processHistoricId)
    if (!processHistory) {
      throw new ResourceNotFoundError()
    }

    const processImported = await this.processImportedRepository.findById(data.importedProcessId)
    if (!processImported) {
      throw new ResourceNotFoundError()
    }

    const newPublication: CreatePublicationDTO = {
      processHistoryId: processHistory.id,
      processTypeId: processImported.processTypeId,
      clientId: client.id!,
      processNumber: processImported.processNumber,
      holder: processImported.holder,
      brand: processImported.markName ?? "",
      nature: processImported.nature ?? "",
      specification: processImported.specification ?? "",
      publicationDate: processImported.receivedDate ?? null,
      depositDate: processImported.depositDate ?? null,
      grantDate: processImported.grantDate ?? null
    }

    return await this.publicationRepository.createTransferImportedProcess(
      newPublication
    );
  }
}