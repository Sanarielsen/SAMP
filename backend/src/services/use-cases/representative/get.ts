import { Representative } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface GetRepresentativeUseCaseRequest {
  id: string
}

export class GetRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    id,
  }: GetRepresentativeUseCaseRequest): Promise<Representative> {

    const representatives = await this.representativeRepository.findById(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    return representatives
  }
}