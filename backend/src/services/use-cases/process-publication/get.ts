import { ProcessPublicationRepository } from "@/repositories/process-publication";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { ProcessPublicationDetails } from "@shared/types/processPublication";


export class GetProcessPublicationUseCase {
  constructor(
    private processPublicationRepository: ProcessPublicationRepository
  ) {}

  async execute(id: string): Promise<ProcessPublicationDetails> {
    
    const processPublication = await this.processPublicationRepository.findByIdDetails(id)

    if (!processPublication) throw new ResourceNotFoundError();

    return processPublication
  }
}