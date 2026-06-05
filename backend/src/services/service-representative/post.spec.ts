import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";
import { PostRepresentativeUseCase } from "@/services/service-representative/post";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { ResourceNotFoundError } from "@/services//errors/resource-not-found-error";
import { InvalidInactiveClientError } from "@/services/errors/invalid-inactive-client-error";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUsersRepository
let sut: PostRepresentativeUseCase

describe('Post Representative User Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUsersRepository()
    clientRepository = new InMemoryClientsRepository()
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
    sut = new PostRepresentativeUseCase(representativeRepository, clientRepository)

    await clientRepository.create({
      id: "client-1",
      legalName: "Samuel Empresa Teste",
      tradeName: "Samuel Empresa composto",
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
      legalName: "Test Company Desactived",
      tradeName: "Test Fantasy",
      type: 1,
      protocol: "12312312389",
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 10, 102, Bairro 1, Cidade 2, Estado 3, Pais 4 - 01234123",
      correspondenceAddress: "Rua 11, 102, Bairro 11, Cidade 22, Estado 33, Pais 44 - 1234512",
      nameContact: "Test contact",
      numberContact: "11912341234",
      isActivated: false,
      createdAt: new Date(Date.now()),
      createdById: "user-1",
      responsibleById: "user-1" 
    })
    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a new representative', async () => {

    const newRepresentative = await sut.execute({
      clientId: 'client-1',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })

    expect(newRepresentative).toBeDefined()
    expect(newRepresentative.id).toEqual(expect.any(String))

    expect(representativeRepository.items).toHaveLength(1)
  })

  it('should not allow creating a representative without a valid client', async () => {

    await expect(() => sut.execute({
      clientId: 'client-10',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow creating a representative without a client activated', async () => {

    await expect(() => sut.execute({
      clientId: 'client-2',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',

    })).rejects.toBeInstanceOf(InvalidInactiveClientError)
  })

  it('should not allow creating a representative without a valid client', async () => {
  await expect(
    sut.execute({
      clientId: 'client-10',
      name: 'Samuel',
      nationality: 'Brazilian',
      documentRG: '123',
      documentCPF: '123',
      titleJob: 'Developer',
      roleJob: 'Backend',
    }),
  ).rejects.toBeInstanceOf(ResourceNotFoundError)
})

  it('should not allow creating a representative for an inactive client', async () => {
    await clientRepository.create({
        id: "client-3",
        legalName: "Test Company Desactived",
        tradeName: "Test Fantasy",
        type: 1,
        protocol: "12312312389",
        dataFundation: new Date(Date.now()),
        locationAddress: "Rua 10, 102, Bairro 1, Cidade 2, Estado 3, Pais 4 - 01234123",
        correspondenceAddress: "Rua 11, 102, Bairro 11, Cidade 22, Estado 33, Pais 44 - 1234512",
        nameContact: "Test contact",
        numberContact: "11912341234",
        isActivated: false,
        createdAt: new Date(Date.now()),
        createdById: "user-1",
        responsibleById: "user-1" 
    })

    await expect( async () =>
      sut.execute({
        clientId: 'client-3',
        name: 'Samuel',
        nationality: 'Brazilian',
        documentRG: '123',
        documentCPF: '123',
        titleJob: 'Developer',
        roleJob: 'Backend',
      }),
    ).rejects.toBeInstanceOf(InvalidInactiveClientError)
  })
})