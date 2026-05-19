import { RepresentativeEntire } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface ListRepresentativeUseCaseRequest {
  idUser: string,
  search: string,
}

export class ListRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository,
  ) {}

  async execute({
    idUser,
    search
  }: ListRepresentativeUseCaseRequest): Promise<RepresentativeEntire[]> {

    const representatives = 
      await this.representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
        idUser, 
        search
    )

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    return representatives
  }
}