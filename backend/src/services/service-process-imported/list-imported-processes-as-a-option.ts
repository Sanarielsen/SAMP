import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";
import { ImportedProcessRepository } from "@/repositories/process-imported-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { OptionsControlledBox } from "@shared/types/values";


export class ListImportedProcessesAsAOptionUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processHistoricRepository: ProcessHistoricRepository,
  ) {}

  async execute(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {

    const processHistoric = await this.processHistoricRepository.findById(processHistoricId)

    if (!processHistoric) {
      throw new ResourceNotFoundError() 
    }

    return await this.importedProcessRepository.findManyByProcessHistoricIdAsAOption(processHistoricId, search)
  }
}
