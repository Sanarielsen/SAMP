import { ClientRepository } from "@/repositories/client-repository";
import { RepresentativeRepository } from "@/repositories/representative-repository";

import { CreateRepresentativeDTO } from "@shared/types/representative";

import { InvalidInactiveClientError } from "@/services/errors/invalid-inactive-client-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

interface PostRepresentativeUseCaseResponse {
  id: string
}

export class PostRepresentativeUseCase {
  constructor(
    private representativeRepository: RepresentativeRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(data: CreateRepresentativeDTO): Promise<PostRepresentativeUseCaseResponse> {

    const client =
      await this.clientRepository.findById(
        data.clientId,
      )

    if (!client) {
      throw new ResourceNotFoundError()
    }

    if (!client.isActivated) {
      throw new InvalidInactiveClientError()
    }

    const newRepresentative = {
      clientId: data.clientId,
      name: data.name,
      nationality: data.nationality,
      documentRG: data.documentRG,
      documentCPF: data.documentCPF,
      titleJob: data.titleJob,
      roleJob: data.roleJob,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    const newRegister = await this.representativeRepository.create(newRepresentative);

    return { id: newRegister.id }
  }
}