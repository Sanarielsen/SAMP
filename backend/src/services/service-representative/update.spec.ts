import { describe, beforeEach, it, expect, vi, afterEach } from "vitest";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UpdateRepresentativeUseCase } from "@/services/service-representative/update";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let sut: UpdateRepresentativeUseCase

describe('Update Representative Use Case', () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository()
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
    sut = new UpdateRepresentativeUseCase(representativeRepository)

    await clientRepository.create({
      id: "client-1",
      legalName: "Client Test Razao social",
      tradeName: "Client Teste Nome Fantasia",
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

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  

  it('should update a representative that already exists in the database', async () => {
    
    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Pleno'
    })

    const representativeUpdated = await sut.execute({
      id: 'new-representative',
      clientId: 'client-1',
      name: 'New Representative Name',
      nationality: 'New nationality name',
    })

    expect(representativeUpdated.name)
      .toBe('New Representative Name')

    expect(representativeUpdated.nationality)
      .toBe('New nationality name')

    expect(representativeUpdated.id)
      .toBe('new-representative')

    expect(representativeUpdated.updatedAt)
      .toEqual(expect.any(Date))
  })

  it('should not be able to update a non-existing representative', async () => {

    await expect(() =>
      sut.execute({
        id: 'non-existing-client',
        clientId: 'client-1',
        name: 'New Representative Name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})