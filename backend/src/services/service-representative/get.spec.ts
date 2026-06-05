import { GetRepresentativeUseCase } from "@/services/service-representative/get";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";

import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let sut: GetRepresentativeUseCase

describe('Get Representative Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository);
    sut = new GetRepresentativeUseCase(representativeRepository);
  })

  it('should be return a represent of valid', async () => {

    await representativeRepository.create({
      id: 'new-representative',
      clientId: 'client-1',
      name: 'Representante Teste 1',
      nationality: 'brasileiro',
      documentRG: '001113338',
      documentCPF: '12378945',
      titleJob: 'Testador',
      roleJob: 'Testador premium'      
    })

    const representativeSearched = await representativeRepository.findById("new-representative")

    expect(representativeSearched?.id).toEqual(expect.any(String))
  })

  it('should be able to get a representative by id', async () => {
    await representativeRepository.create({
      id: 'representative-1',
      clientId: 'client-1',
      name: 'Samuel',
      nationality: 'Brasileiro',
      documentRG: '123',
      documentCPF: '123',
      titleJob: 'Developer',
      roleJob: 'Backend',
    })

    const representative = await sut.execute({
      id: 'representative-1',
    })

    expect(representative).toBeDefined()
    expect(representative.id).toBe('representative-1')
  })

  it('should be not return a represent of invalid', async () => {

    const representative = await representativeRepository.findById( 
      'invalid-id',
    )

    expect(representative).toBeNull()
  })

  it('should not be able to get a non-existing representative', async () => {
    await expect(
      sut.execute({
        id: 'representative-999',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
