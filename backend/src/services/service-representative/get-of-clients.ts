import { RepresentativeRepository } from "@/repositories/representative-repository"
import { RepresentativeOptionDTO } from "@shared/types/representative"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

interface GetRepresentativeOfClientsUseCaseRequest {
  id: string
}

export class GetRepresentativeOfClientsUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    id,
  }: GetRepresentativeOfClientsUseCaseRequest): Promise<RepresentativeOptionDTO[] | null> {

    const representatives = await this.representativeRepository.findManyRepresentsOnClientsId(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    return representatives
  }
}