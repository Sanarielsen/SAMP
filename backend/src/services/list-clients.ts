
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ClientRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface ListClientUseCaseRequest {
  responsibleById: string
  search: string
}

type ListClientUseCaseResponse = Client[]

export class ListClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    responsibleById,
    search,
  }: ListClientUseCaseRequest): Promise<ListClientUseCaseResponse> {
    
    const clients = await this.clientRepository.findByIdUserResponsableAndSearch(responsibleById, search)

    return clients
  }
}