import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-client-repository'

import { expect, describe, it, beforeEach } from 'vitest'
import { GetClientUseCase } from './get-client'

let clientRepository: InMemoryClientsRepository
let sut: GetClientUseCase

describe('Get Client Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new GetClientUseCase(clientRepository)
  })

  it('should be able to get a client using id', async () => {

    await clientRepository.create({
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

    const clientSearched = await clientRepository.findById("client-1")
    
    expect(clientSearched?.id).toEqual(expect.any(String))
  })

  it('should not be able to get a client using id incorrect', async () => {

    await clientRepository.create({
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

    const clientSearched = await clientRepository.findById("client-2");
    
    expect(clientSearched).toBeNull()
  })

  it('should be able to get client using the protocol', async () => {
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

    const clientSearched = await clientRepository.findByProtocol(client.protocol)

    expect(clientSearched?.protocol).toEqual("12345678912345")
  })

  it('should not be able to get a client with an invalid protocol', async () => {

    const protocol = "12345"

    const clientSearched = await clientRepository.findByProtocol(protocol)

    expect(clientSearched).toBeNull()
  })
})