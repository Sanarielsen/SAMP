
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ClientRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface GetClientUseCaseRequest {
  clientId: string
}

interface GetClientUseCaseResponse {
  client: Client
}

export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    clientId,
  }: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
    
    const client = await this.clientRepository.findById(clientId)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    return {
      client,
    }
  }
}