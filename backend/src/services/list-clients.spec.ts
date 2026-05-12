import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ListClientUseCase } from '@/services/list-clients'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-client-repository'

let clientRepository: InMemoryClientsRepository
let sut: ListClientUseCase

describe('List User Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new ListClientUseCase(clientRepository)
  })

  it('should be return all users of one responsable', async () => {

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

    const clients = await sut.execute({
      responsibleById: 'user-1',
    })

    expect(clients).toHaveLength(1)
  })

  it('should not return clients when user has no clients', async () => {
    await expect(() =>
      sut.execute({
        responsibleById: 'user-2',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})