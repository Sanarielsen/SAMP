import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { PostPublicationUseCase } from "@/services/service-publication/post";

import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { InMemoryPublicationRepository } from "@/repositories/in-memory/in-memory-publication";
import { makePublication } from "@/services/factories/publication/make-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeProcessType } from "@/services/factories/process-type/make-entity";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";

import { Client } from "@shared/types/client";
import { ProcessType } from "@shared/types/processType";
import { Publication } from "@shared/types/publication";


let userRoleRepository = new InMemoryUserRoleRepository()
let userRepository = new InMemoryUserRepository()
let clientRepository: InMemoryClientsRepository
let processTypeRepository: InMemoryProcessTypeRepository
let publicationRepository: InMemoryPublicationRepository
let sut: PostPublicationUseCase

let newClient: Client
let newProcessType: ProcessType
let newPublication: Publication

describe('Post Publication Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository(),
    userRepository = new InMemoryUserRepository(),
    clientRepository = new InMemoryClientsRepository()
    processTypeRepository = new InMemoryProcessTypeRepository();
    publicationRepository = new InMemoryPublicationRepository(
      userRoleRepository,
      userRepository,
      clientRepository,
      processTypeRepository
    );

    sut = new PostPublicationUseCase(
      clientRepository,
      processTypeRepository, 
      publicationRepository
    )

    newClient = await makeClient( clientRepository )
    newProcessType = await makeProcessType( processTypeRepository )
    newPublication = await makePublication( publicationRepository, {
      clientId: newClient.id,
      processTypeId: newProcessType.id
    })
  })

  it('should create a new publication', async () => {
    const newPub = await sut.execute({
      ...newPublication,
      processNumber: '1234'
    })

    expect(newPub.brand).toEqual('Marca test')
  })

  it('should not create a publication with an already registered process number', async () => {
    await expect(() => sut.execute({
      ...newPublication,
    })).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })

  it('should not create a publication for a non-existent client', async () => {
    await expect(() => sut.execute({
      ...newPublication,
      clientId: 'non-existent-client-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create a publication with a non-existent process type', async () => {
    await expect(() => sut.execute({
      ...newPublication,
      processTypeId: 'non-existent-process-type-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})