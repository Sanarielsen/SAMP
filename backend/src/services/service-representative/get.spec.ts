import { GetRepresentativeUseCase } from "./get";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";

import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

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

  it('should be not return a represent of invalid', async () => {

    const representative = await representativeRepository.findById( 
      'invalid-id',
    )

    expect(representative).toBeNull()
  })
})
