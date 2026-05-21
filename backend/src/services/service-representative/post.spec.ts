import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { PostRepresentativeUseCase } from "./post";

import { InMemoryRepresentativeRepository } from "@/repositories/in-memory/in-memory-representatives-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let representativeRepository: InMemoryRepresentativeRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUsersRepository
let sut: PostRepresentativeUseCase

describe('Post Representative User Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    clientRepository = new InMemoryClientsRepository()
    representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
    sut = new PostRepresentativeUseCase(representativeRepository, clientRepository)
  })

  it('should be able to create a new representative', async () => {

    const newRepresentative = await representativeRepository.create({
      clientId: 'client-1',
      name: 'Representante Teste',
      nationality: 'Brasileiro',
      documentRG: '123456789',
      documentCPF: '12312312389',
      titleJob: 'Desenvolvedor de Software',
      roleJob: 'Junior'
    })

    expect(newRepresentative).toBeDefined()
  })

  // it('should not be able to create a new representative with an inactive client', async () => {

  //   await expect(
  //     sut.execute({
  //       clientId: 'client-1',
  //       name: 'Representante Teste',
  //       nationality: 'Brasileiro',
  //       documentRG: '123456789',
  //       documentCPF: '12312312389',
  //       titleJob: 'Desenvolvedor de Software',
  //       roleJob: 'Junior',
  //       createdAt: new Date(Date.now())
  //     }),
  //   ).rejects.toBeInstanceOf(
  //     InvalidInactiveClientError,
  //   )
  // })

  // it('should not be able to create a new representative if the user is not responsible for the client', async () => {

  // })

  // it('should not be able to create a new representative with an invalid user', async () => {

  // })

  // it('should not be able to create a new representative with an invalid client', async () => {

  // })
})