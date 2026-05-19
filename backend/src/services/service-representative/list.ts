import { RepresentativeEntire } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface ListRepresentativeUseCaseRequest {
  id: string
}

export class ListRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    id,
  }: ListRepresentativeUseCaseRequest): Promise<RepresentativeEntire> {

    const representatives = await this.representativeRepository.findById(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    return representatives
  }
}