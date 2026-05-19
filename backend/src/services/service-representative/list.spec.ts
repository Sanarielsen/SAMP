import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ListRepresentativeUseCase } from "./list";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUsersRepository
let sut: ListRepresentativeUseCase

describe('List Representative Use Case', () => {
  beforeEach(async () => {
    
    userRepository = new InMemoryUsersRepository();
    clientRepository = new InMemoryClientsRepository();
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)

    sut = new ListRepresentativeUseCase(representativeRepository)

    await userRepository.create({
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      password_hash: await hash('123456', 6),
    })

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

  it('should be able to get a list of representative using user id', async () => {

    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Gustavo Rossi',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',  
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })

    await representativeRepository.create({

      clientId: 'client-2',
      name: 'Guilherme Zaldini',
      nationality: 'Frances',
      documentRG: '123456788',
      documentCPF: '12312312387',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Senior',
    })

    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Abilio Correa',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312381',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Pleno'
    })

    const representedSearched = await representativeRepository
      .findByIdUserWithSearchRepresentativesOnlyClientsActivated("user-1", "")

    expect(representedSearched).toHaveLength(2)
  })

  it('should be not able to get a list of representative using user id you not responsable', async () => {

    await representativeRepository.create({
      clientId: 'client-2',
      name: 'Gustavo Rossi',
      nationality: 'Gustavo Rossi',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })

    await representativeRepository.create({
      clientId: 'client-3',
      name: 'Gustavo Rossi',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })

    const representedSearched = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated('user-1', 'Brasileiro');

    expect(representedSearched).toHaveLength(0)
  })
})