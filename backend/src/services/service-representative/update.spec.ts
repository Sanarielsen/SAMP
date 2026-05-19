import { describe, beforeEach, it, expect } from "vitest";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UpdateRepresentativeUseCase } from "@/services/service-representative/update";

let representativeRepository: InMemoryRepresentativeRepository
let sut: UpdateRepresentativeUseCase

describe('Update Representative Use Case', () => {
  beforeEach(() => {
    representativeRepository = new InMemoryRepresentativeRepository()
    sut = new UpdateRepresentativeUseCase(representativeRepository)
  })

  it('should update a representative that already exists in the database', async () => {
    
    await representativeRepository.create({
      id: 'representative-1',
      idClient: 'client-1',
      name: 'Representante Teste',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Pleno',
      updatedAt: null
      
    })

    const representativeUpdated = await sut.execute({
      id: 'representative-1',
      idClient: 'client-1',
      name: 'New Representative Name',
      nacionality: 'New nacionality name',
    })

    expect(representativeUpdated.name)
      .toBe('New Representative Name')

    expect(representativeUpdated.nacionality)
      .toBe('New nacionality name')

    expect(representativeUpdated.id)
      .toBe('representative-1')

    expect(representativeUpdated.updatedAt)
      .toEqual(expect.any(Date))
  })

  it('should not be able to update a non-existing representative', async () => {

    await expect(() =>
      sut.execute({
        id: 'non-existing-client',
        idClient: 'client-1',
        name: 'New Representative Name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})