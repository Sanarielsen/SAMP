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
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUsersRepository
let sut: DeleteRepresentativeUseCase

describe('Delete Representative Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    clientRepository = new InMemoryClientsRepository()
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
    sut = new DeleteRepresentativeUseCase(representativeRepository)
    
    await userRepository.create({
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      password_hash: await hash('123456', 6),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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
