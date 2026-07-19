import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdatePublicationUseCase } from "@/services/service-publication/update";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { InMemoryPublicationRepository } from "@/repositories/in-memory/in-memory-publication";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeProcessType } from "@/services/factories/process-type/make-entity";
import { makePublication } from "@/services/factories/publication/make-entity";

import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Client } from "@shared/types/client";
import { ProcessType } from "@shared/types/processType";
import { Publication } from "@shared/types/publication";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let clientRepository: InMemoryClientsRepository
let processTypeRepository: InMemoryProcessTypeRepository
let publicationRepository: InMemoryPublicationRepository
let sut: UpdatePublicationUseCase

let newClient: Client
let newProcessType: ProcessType
let newPublication: Publication

describe('Update Publication Use Case', () => {
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
    
        sut = new UpdatePublicationUseCase(
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

  it('should update a new publication', async () => {

    const updatedPub = await sut.execute({
      ...newPublication,
      brand: 'updated brand'
    })

    expect(updatedPub.brand).toEqual('updated brand')
  })

  it('should not update a publication with an already registered process number', async () => {

    const newPublicationWillBeUdated = await makePublication( publicationRepository, {
      clientId: newClient.id,
      processTypeId: newProcessType.id,
      processNumber: '123456781'
    })

    await expect(() => sut.execute({
      id: newPublicationWillBeUdated.id,
      clientId: newPublicationWillBeUdated.clientId,
      processTypeId: newPublicationWillBeUdated.processTypeId,
      processNumber: newPublication.processNumber
    })).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })

  it('should not update a publication for a non-existent publication', async () => {
    await expect(() => sut.execute({
      ...newPublication,
      id: 'non-existent-publication-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update a publication for a non-existent client', async () => {
    await expect(() => sut.execute({
      ...newPublication,
      clientId: 'non-existent-client-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update a publication with a non-existent process type', async () => {
    await expect(() => sut.execute({
      ...newPublication,
      processTypeId: 'non-existent-process-type-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})