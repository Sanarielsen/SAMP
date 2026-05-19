import { RepresentativeEntire, RepresentativeList } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface ListRepresentativeUseCaseRequest {
  idClient: string,
  search: string,
}

export class ListRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    idClient,
    search
  }: ListRepresentativeUseCaseRequest): Promise<RepresentativeList[]> {

    const representatives = await this.representativeRepository.findByIdClientWithSearchRepresentativesActivated(idClient, search)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    return representatives
  }
}