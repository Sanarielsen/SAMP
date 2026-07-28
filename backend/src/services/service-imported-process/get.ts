import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { ImportedProcess } from "@shared/types/importedProcess";


export class GetImportedProcessUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository
  ) {}

  async execute(id: string): Promise<ImportedProcess> {
    
    const importedProcess = await this.importedProcessRepository.findById(id)
    if (!importedProcess) throw new ResourceNotFoundError();

    return importedProcess
  }
}