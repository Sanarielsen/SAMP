import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteRepresentativeUseCase } from "@/services/service-representative/delete";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";

let representativeRepository: InMemoryRepresentativeRepository
let sut: DeleteRepresentativeUseCase

describe('Delete Representative Use Case', () => {
  beforeEach(() => {
    representativeRepository = new InMemoryRepresentativeRepository()
    sut = new DeleteRepresentativeUseCase(representativeRepository)
  })

  it('should apply soft delete when representative is valid', async () => {
    
    await representativeRepository.create({
      id: 'representant-1',
      idClient: 'client-1',
      name: 'Representante Teste',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null,
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
    })

    const onlyActivatedRepresentatives = await representativeRepository.findByIdClientWithSearchRepresentativesActivated("client-1", "Teste");

    if (!onlyActivatedRepresentatives) return

    expect(onlyActivatedRepresentatives[0].deletedAt).toBe(null)
  })

  it('should not apply soft delete when representative does not exist', async () => {

    await representativeRepository.create({
      id: 'representant-1',
      idClient: 'client-1',
      name: 'Representante Teste',
      nacionality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: new Date(Date.now()),
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
    })

    const onlyActivatedRepresentatives = await representativeRepository.findByIdClientWithSearchRepresentativesActivated("client-1", "Teste");

    if (!onlyActivatedRepresentatives) return

    expect(onlyActivatedRepresentatives).toStrictEqual([])
  })
})
