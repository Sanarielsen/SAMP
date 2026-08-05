import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";
import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { OptionsControlledBox } from "@shared/types/values";


export class ListImportedProcessesAsAOptionUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processHistoricRepository: ProcessHistoryRepository,
  ) {}

  async execute(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {

    const processHistoric = await this.processHistoricRepository.findById(processHistoricId)

    if (!processHistoric) {
      throw new ResourceNotFoundError() 
    }

    return await this.importedProcessRepository.findManyByProcessHistoricIdAsAOption(processHistoricId, search)
  }
}
