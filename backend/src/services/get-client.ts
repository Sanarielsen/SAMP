
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ClientRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface GetClientUseCaseRequest {
  clientId: string
}

interface GetClientUseCaseResponse {
  id: string
  legalName: string
  tradeName: string
  type: number
  protocol: string
  dataFundation: Date
  locationAddress: string
  correspondenceAddress: string
  nameContact: string
  numberContact: string
  isActivated: boolean
  createdAt: Date
  updatedAt: Date | null
  createdById: string
  responsibleById: string
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
      id: client.id,
      legalName: client.legalName,
      tradeName: client.tradeName,
      type: client.type,
      protocol: client.protocol,
      dataFundation: client.dataFundation,
      locationAddress: client.locationAddress,
      correspondenceAddress: client.correspondenceAddress,
      nameContact: client.nameContact,
      numberContact: client.numberContact,
      isActivated: client.isActivated,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      createdById: client.createdById,
      responsibleById: client.responsibleById
    }
  }
}