import { expect, describe, it, beforeEach } from 'vitest'

import { GetClientUseCase } from '@/services/service-client/get'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-client-repository'

let clientRepository: InMemoryClientsRepository
let sut: GetClientUseCase

describe('Post User Profile Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new GetClientUseCase(clientRepository)
  })

  it('should be able to get user profile', async () => {
    const createdClient = await clientRepository.create({
      id: "client-1",
      legalName: "Sanarielsen Teste",
      tradeName: "Sanarielsen Teste composto",
      type: 2,
      protocol: "12345678912345",
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 10, 102, Bairro 1, Cidade 2, Estado 3, Pais 4 - 01234123",
      correspondenceAddress: "Rua 11, 102, Bairro 11, Cidade 22, Estado 33, Pais 44 - 1234512",
      nameContact: "Samuel",
      numberContact: "11912341234",
      isActivated: true,
      createdAt: new Date(Date.now()),
      createdById: "user-1",
      responsibleById: "user-1"       
    })

    const client = await sut.execute({
      clientId: createdClient.id
    })
    
    expect(client.legalName).toEqual("Sanarielsen Teste")
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => sut.execute({
      clientId: "non-existing-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})