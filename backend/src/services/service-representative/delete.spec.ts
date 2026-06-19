import { hash } from "bcryptjs";
import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";

import { DeleteRepresentativeUseCase } from "@/services/service-representative/delete";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUserRepository
let sut: DeleteRepresentativeUseCase

describe('Delete Representative Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    clientRepository = new InMemoryClientsRepository()
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
    sut = new DeleteRepresentativeUseCase(representativeRepository)
    
    await userRepository.create({
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      password_hash: await hash('123456', 6),
      roleId: 'role-1'
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to delete a representative', async () => {
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

    await sut.execute({
      id: 'representative-1',
    })

    expect(representativeRepository.items[0].deletedAt).not.toBeNull()
  })

  it('should not be able to delete a non-existing representative', async () => {
    await expect(
      sut.execute({
        id: 'representative-999',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should apply soft delete when representative is valid', async () => {
    
    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
    })

    const onlyActivatedRepresentatives = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated("user-1", "Brasileiro");

    expect(onlyActivatedRepresentatives).toHaveLength(0)
  })

  it('should not apply soft delete when representative does not exist', async () => {

    await representativeRepository.create({
      clientId: 'client-1',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior',
    })

    const onlyActivatedRepresentatives = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated("user-1", "Teste");

    if (!onlyActivatedRepresentatives) return

    expect(onlyActivatedRepresentatives).toStrictEqual([])
  })
})
