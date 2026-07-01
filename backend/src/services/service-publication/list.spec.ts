import { 
  expect, 
  describe, 
  it, 
  beforeEach 
} from 'vitest';

import { ListPublicationUseCase } from '@/services/service-publication/list';

import { InMemoryPublicationRepository } from '@/repositories/in-memory/in-memory-publication';
import { InMemoryProcessTypeRepository } from '@/repositories/in-memory/in-memory-process-type';
import { InMemoryProcessCategoryRepository } from '@/repositories/in-memory/in-memory-process-category';
import { InMemoryProcessHistoryRepository } from '@/repositories/in-memory/in-memory-process-history';
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-client-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InMemoryUserRoleRepository } from '@/repositories/in-memory/in-memory-user-role-repository';
import { makeClient } from '@/services/factories/client/make-entity';
import { makeProcessHistory } from '@/services/factories/process-historic/make-entity';
import { makeProcessType } from '@/services/factories/process-type/make-entity';
import { makePublication } from '@/services/factories/publication/make-entity';
import { makeUser } from '@/services/factories/user/make-entity';
import { makeUserRole } from '@/services/factories/user-role/make-entity';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

import { User } from '@shared/types/user';


let publicationRepository: InMemoryPublicationRepository
let processTypeRepository: InMemoryProcessTypeRepository
let processCategoryRepository: InMemoryProcessCategoryRepository
let processHistoryRepository: InMemoryProcessHistoryRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository

let sut: ListPublicationUseCase
let newUser: User
let newUserAdmin: User

describe('List Publication Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository()
    clientRepository = new InMemoryClientsRepository()
    processCategoryRepository = new InMemoryProcessCategoryRepository()
    processTypeRepository = new InMemoryProcessTypeRepository()
    processHistoryRepository = new InMemoryProcessHistoryRepository()

    publicationRepository = new InMemoryPublicationRepository(
      userRoleRepository,
      userRepository,
      clientRepository,
      processHistoryRepository,
      processTypeRepository
    );

    sut = new ListPublicationUseCase(
      publicationRepository,
      userRepository
    )

    const newUserRole = await makeUserRole(userRoleRepository, {
      level: 2,
    })

    const newUserRoleAdmin = await makeUserRole(userRoleRepository, {
      level: 1,
    })

    newUser = await makeUser(userRepository, {
      roleId: newUserRole.id,
    })

    newUserAdmin = await makeUser(userRepository, {
      roleId: newUserRoleAdmin.id,
    })

    const client1 = await makeClient(clientRepository, {
      responsibleById: newUser.id
    })
    const client2 = await makeClient(clientRepository, {
      responsibleById: newUserAdmin.id
    })

    const processHistory = await makeProcessHistory(processHistoryRepository)

    const processType = await makeProcessType(processTypeRepository)

    await makePublication(publicationRepository, {
      clientId: client1.id,
      processHistoryId: processHistory.id,
      processTypeId: processType.id
    })

    await makePublication(publicationRepository, {
      clientId: client1.id,
      processHistoryId: processHistory.id,
      processTypeId: processType.id
    })

    await makePublication(publicationRepository, {
      clientId: client2.id,
      processHistoryId: processHistory.id,
      processTypeId: processType.id
    })

    await makePublication(publicationRepository, {
      clientId: client2.id,
      processHistoryId: processHistory.id,
      processTypeId: processType.id
    })

    await makePublication(publicationRepository, {
      clientId: client2.id,
      processHistoryId: processHistory.id,
      processTypeId: processType.id
    })
  })

  it('should list all publications for an ADMIN user', async () => {
    const publications = await sut.execute(newUserAdmin.id)

    expect(publications).toHaveLength(5)
  })

  it('should list only publications for clients the user is responsible for', async () => {
    const publications = await sut.execute(newUser.id)

    expect(publications).toHaveLength(2)
  })

  it('should not list publications for a non-existent user', async () => {
    await expect(() => sut.execute(
      'invalid-user-id', ''
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})