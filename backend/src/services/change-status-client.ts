import { Client } from '@prisma/client'

import { ClientRepository }
  from '@/repositories/client-repository'

import { ResourceNotFoundError }
  from './errors/resource-not-found-error'

interface UpdateClientStatusUseCaseRequest {
  id: string
  isActivated: boolean
}

type UpdateClientStatusUseCaseResponse = Client

export class UpdateClientStatusUseCase {

  constructor(
    private clientRepository: ClientRepository,
  ) {}

  async execute({
    id,
    isActivated,
  }: UpdateClientStatusUseCaseRequest)
  : Promise<UpdateClientStatusUseCaseResponse> {

    const client =
      await this.clientRepository.findById(id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.clientRepository.update(id, {
        isActivated,
      })

    return updatedClient
  }
}