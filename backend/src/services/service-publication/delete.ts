import { PublicationRepository } from "@/repositories/publication-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeletePublicationUseCase {
  constructor(
    private publicationRepository: PublicationRepository
  ) {}

  async execute(id: string): Promise<void> {
    
    const publication = await this.publicationRepository.findById(id)

    if (!publication) throw new ResourceNotFoundError();

    await this.publicationRepository.delete(id)
  }
}