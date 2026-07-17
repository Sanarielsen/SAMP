import { PublicationRepository } from "@/repositories/publication-repository"
import { UserRepository } from "@/repositories/user-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PublicationDetails } from "@shared/types/publication"


export class ListPublicationUseCase {
  constructor(
    private publicationRepository: PublicationRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(userId: string, search?: string): Promise<PublicationDetails[] | null> {

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return this.publicationRepository.findManySearchByUserId(userId, search);

  }
}