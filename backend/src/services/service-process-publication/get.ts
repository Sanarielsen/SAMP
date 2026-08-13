import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { ProcessPublication } from "@shared/types/processPublication";


export class GetProcessPublicationUseCase {
  constructor(
    private processPublicationRepository: ProcessPublicationRepository
  ) {}

  async execute(id: string): Promise<ProcessPublication> {
    
    const processPublication = await this.processPublicationRepository.findById(id)

    if (!processPublication) throw new ResourceNotFoundError();

    return processPublication
  }
}