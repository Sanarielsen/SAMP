import { 
  InMemoryClientsRepository 
} from '@/repositories/in-memory/in-memory-client-repository'

import { CreateClientDTO } from '@shared/types/client'


export async function makeClient(
  repository: InMemoryClientsRepository,
  override: Partial<CreateClientDTO> = {},
) {

  return repository.create({
    legalName: 'Razao social test',
    tradeName: 'Nome fantasia test',
    type: 1,
    protocol: '123456789',
    dataFundation: new Date(Date.now()),
    locationAddress: 'Rua test location',
    correspondenceAddress: 'Rua test correspondence',
    nameContact: 'Contact test',
    numberContact: '11111111111',
    isActivated: true,
    createdById: 'user-test',
    responsibleById: 'user-test',
    createdAt: new Date(Date.now()),

    ...override,
  })
}