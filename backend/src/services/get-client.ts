
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ClientRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface GetClientUseCaseRequest {
  clientId: string
}

interface GetClientUseCaseResponse {
  user: Client
}

export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    clientId,
  }: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
    
    const user = await this.clientRepository.findById(clientId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}