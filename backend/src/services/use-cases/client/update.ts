import { ClientRepository } from "@/repositories/client-repository"
import { Client } from "@prisma/client"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

interface UpdateClientUseCaseRequest {
  id: string

  legalName?: string
  tradeName?: string
  type?: number
  protocol?: string
  dataFundation?: Date
  locationAddress?: string
  correspondenceAddress?: string
  nameContact?: string
  numberContact?: string
  isActivated?: boolean
  responsibleById?: string
}

type UpdateClientUseCaseResponse = Client

export class UpdateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
  ) {}

  async execute({
    id,
    ...data
  }: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {

    const client = await this.clientRepository.findById(id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.clientRepository.update(id, data)

    return updatedClient
  }
}