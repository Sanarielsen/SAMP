//GET /client/:id/representatives?search

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListRepresentativeUseCase } from "./list";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let sut: ListRepresentativeUseCase

describe('List Representative Use Case', () => {
  beforeEach(() => {
    representativeRepository = new InMemoryRepresentativeRepository()
    clientRepository = new InMemoryClientsRepository();

    sut = new ListRepresentativeUseCase(representativeRepository)
  })

  it('should be able to get a list of representative using user id', async () => {

    await representativeRepository.create({
      id: 'representant-1',
      idClient: 'client-1',
      name: 'Gustavo Rossi',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
      updatedAt: null
    })

    await representativeRepository.create({
      id: 'representant-2',
      idClient: 'client-2',
      name: 'Guilherme Zaldini',
      nacionality: 'Frances',
      documentRG: '123456788',
      documentCPF: '12312312387',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Senior',
      updatedAt: null
    })

    await representativeRepository.create({
      id: 'representant-3',
      idClient: 'client-1',
      name: 'Abilio Correa',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312381',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Pleno',
      updatedAt: null
    })

    const representedSearched = await representativeRepository.findManyByUserIdWithSearch('user-1', 'a');

    expect(representedSearched).toHaveLength(2)
  })

  it('should be not able to get a list of representative using user id you not responsable', async () => {

    await representativeRepository.create({
      id: 'representant-1',
      idClient: 'client-2',
      name: 'Gustavo Rossi',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
      updatedAt: null
    })

    await representativeRepository.create({
      id: 'representant-2',
      idClient: 'client-3',
      name: 'Gustavo Rossi',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
      updatedAt: null
    })

    const representedSearched = await representativeRepository.findManyByUserIdWithSearch('user-1', 'a');

    expect(representedSearched).toHaveLength(0)
  })
})