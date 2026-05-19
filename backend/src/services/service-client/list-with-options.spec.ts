import { expect, describe, it, beforeEach } from 'vitest'
import { ListClientUseCase } from '@/services/service-client/list'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-client-repository'

let clientRepository: InMemoryClientsRepository
let sut: ListClientUseCase

describe('List User Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new ListClientUseCase(clientRepository)
  })

  it('should list clients by responsible user', async () => {
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

    await clientRepository.create({
      id: "client-2",
      legalName: "Sanarielsen Teste 2",
      tradeName: "Sanarielsen Teste composto 2",
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

    await clientRepository.create({
      id: "client-3",
      legalName: "Sanarielsen Teste 3",
      tradeName: "Sanarielsen Teste composto 3",
      type: 2,
      protocol: "12345678912345",
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 10, 102, Bairro 1, Cidade 2, Estado 3, Pais 4 - 01234123",
      correspondenceAddress: "Rua 11, 102, Bairro 11, Cidade 22, Estado 33, Pais 44 - 1234512",
      nameContact: "Samuel",
      numberContact: "11912341234",
      isActivated: false,
      createdAt: new Date(Date.now()),
      createdById: "user-1",
      responsibleById: "user-1" 
    })

    const result =
      await clientRepository
        .findByIdUserResponsableActivated('user-1')

    expect(result).toHaveLength(2)
  })
})