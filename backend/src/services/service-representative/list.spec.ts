import { 
  afterEach, 
  beforeEach, 
  describe, 
  expect, 
  it, 
  vi 
} from "vitest";

import { Client } from "@prisma/client";
import { hash } from "bcryptjs";

import { ListRepresentativeUseCase } from "@/services/service-representative/list";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUserRepository
let sut: ListRepresentativeUseCase

describe('List Representative Use Case', () => {
  beforeEach(async () => {
    
    userRepository = new InMemoryUserRepository();
    clientRepository = new InMemoryClientsRepository();
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)

    sut = new ListRepresentativeUseCase(representativeRepository)

    await userRepository.create({
      id: 'user-1',
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      password_hash: await hash('123456', 6),
      roleId: "role-1"
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

  it('should be able to list representatives', async () => {
    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Samuel',
      nationality: 'Brasileiro',
      documentRG: '123',
      documentCPF: '123',
      titleJob: 'Developer',
      roleJob: 'Backend',
    })

    const representatives = await sut.execute({
      idUser: 'user-1',
      search: '',
    })

    expect(representatives).toHaveLength(1)
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

  it('should list representatives by client id', async () => {
    clientRepository.items.push({
      id: 'client-test',
      legalName: 'Client Test',
    } as Client)

    await representativeRepository.create({
      clientId: 'client-test',
      name: 'Samuel',
      nationality: 'Brazilian',
      documentRG: '123',
      documentCPF: '123',
      titleJob: 'Developer',
      roleJob: 'Backend',
    })

    const representatives =
      await representativeRepository
        .findManyRepresentsOnClientsId('client-test')

    expect(representatives).toHaveLength(1)

    expect(representatives?.[0]).toEqual({
      value: 'client-test',
      label: 'Client Test',
    })
  })

  it('should throw when repository returns null', async () => {
    representativeRepository
      .findByIdUserWithSearchRepresentativesOnlyClientsActivated =
        vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute({
        idUser: 'user-1',
        search: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})