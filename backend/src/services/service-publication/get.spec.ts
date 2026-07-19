import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetPublicationUseCase } from "@/services/service-publication/get";

import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { InMemoryPublicationRepository } from "@/repositories/in-memory/in-memory-publication";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeProcessType } from "@/services/factories/process-type/make-entity";
import { makePublication } from "@/services/factories/publication/make-entity";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Client } from "@shared/types/client";
import { ProcessType } from "@shared/types/processType";
import { Publication } from "@shared/types/publication";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let clientRepository: InMemoryClientsRepository
let processTypeRepository: InMemoryProcessTypeRepository
let publicationRepository: InMemoryPublicationRepository
let sut: GetPublicationUseCase
let newClient: Client
let newProcessType: ProcessType
let newPublication: Publication

describe('Get Publication Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository()
    userRepository = new InMemoryUserRepository()
    clientRepository = new InMemoryClientsRepository()
    processTypeRepository = new InMemoryProcessTypeRepository()
    publicationRepository = new InMemoryPublicationRepository(
      userRoleRepository,
      userRepository,
      clientRepository,
      processTypeRepository
    )

    sut = new GetPublicationUseCase(
      publicationRepository
    )

    newClient = await makeClient( clientRepository )
    newProcessType = await makeProcessType( processTypeRepository )
    newPublication = await makePublication( publicationRepository, {
      clientId: newClient.id,
      processTypeId: newProcessType.id
    })
  })

  it('should query a publication', async () => {
    const publication = await sut.execute(newPublication.id)

    expect(publication.brand).toEqual('Marca test')
  })

  it('should not query for a non-existent publication', async () => {
    await expect(() => sut.execute(
      'non-existent-id'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})