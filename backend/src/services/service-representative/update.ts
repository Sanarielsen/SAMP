import { RepresentativeCustom } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


interface UpdateRepresentativeUseCaseRequest {
  id: string,
  idClient: string,
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
    idClient,
    ...data
  }: UpdateRepresentativeUseCaseRequest): Promise<RepresentativeCustom> {

    const representatives = await this.representativeRepository.findById(id)

    if (!representatives) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.representativeRepository.update({ id, idClient, ...data })

    return updatedClient
  }
}