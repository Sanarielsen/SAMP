
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ClientRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface ListClientUseCaseRequest {
  responsibleById: string
}

type ListClientUseCaseResponse = Client[]

export class ListClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    responsibleById,
  }: ListClientUseCaseRequest): Promise<ListClientUseCaseResponse> {
    
    const clients = await this.clientRepository.findByIdUserResponsable(responsibleById)

    if (clients.length === 0) {
      throw new ResourceNotFoundError()
    }

    return clients
  }
}