import { ImportedProcessRepository } from "@/repositories/process-imported-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { DetailsProcessImportedDTO } from "@shared/types/processImported";


export class GetProcessImportedWithDetailsUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository
  ) {}

  async execute(id: string): Promise<DetailsProcessImportedDTO> {

    const processImported = await this.importedProcessRepository.findByIdDetails(id)

    if (!processImported) {
      throw new ResourceNotFoundError() 
    }

    return processImported
  }
}
