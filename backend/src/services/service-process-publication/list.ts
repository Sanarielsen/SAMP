import { ImportedProcessRepository } from "@/repositories/imported-process-repository";
import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";
import { ProcessPublication } from "@shared/types/processPublication";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class ListProcessPublicationsUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processPublicationsRepository: ProcessPublicationRepository
  ) {}

  async execute(processId: string): Promise<ProcessPublication[]> {

    const importedProcess = await this.importedProcessRepository.findById(processId)
    if (!importedProcess) throw new ResourceNotFoundError();
    
    return await this.processPublicationsRepository.findManyByProcessId(processId)
  }
}