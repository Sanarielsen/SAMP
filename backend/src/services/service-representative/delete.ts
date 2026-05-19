import { RepresentativeEntire } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

interface DeleteRepresentativeUseCaseRequest {
  id: string
}

export class DeleteRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    id,
  }: DeleteRepresentativeUseCaseRequest): Promise<void> {

    const representatives = await this.representativeRepository.findById(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    await this.representativeRepository.delete(id)
  }
}