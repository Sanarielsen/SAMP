import { ProcessImportedRepository } from "@/repositories/process-imported-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { DetailsProcessImportedDTO } from "@shared/types/processImported";


export class GetProcessImportedWithDetailsUseCase {
  constructor(
    private importedProcessRepository: ProcessImportedRepository
  ) {}

  async execute(id: string): Promise<DetailsProcessImportedDTO> {

    const processImported = await this.importedProcessRepository.findByIdDetails(id)

    if (!processImported) {
      throw new ResourceNotFoundError() 
    }

    return processImported
  }
}
