import { PublicationRepository } from "@/repositories/publication-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Publication } from "@shared/types/publication";


export class GetPublicationUseCase {
  constructor(
    private publicationRepository: PublicationRepository
  ) {}

  async execute(id: string): Promise<Publication> {
    
    const publication = await this.publicationRepository.findById(id)

    if (!publication) throw new ResourceNotFoundError();

    return publication
  }
}