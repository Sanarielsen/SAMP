import { Representative } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface UpdateRepresentativeUseCaseRequest {
  id: string,
  clientId: string,
  name?: string,
  nationality?: string,
  documentRG?: string,
  documentCPF?: string,
  titleJob?: string,
  roleJob?: string,
}

export class UpdateRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository
  ) {}

  async execute({
    id,
    clientId,
    ...data
  }: UpdateRepresentativeUseCaseRequest): Promise<Representative> {

    const representatives = await this.representativeRepository.findById(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.representativeRepository.update({ id, clientId, ...data })

    return updatedClient
  }
}