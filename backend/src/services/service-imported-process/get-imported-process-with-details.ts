import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { DetailsProcessImportedDTO } from "@shared/types/importedProcess";


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
