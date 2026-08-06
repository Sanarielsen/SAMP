import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdateImportedProcessUseCase } from "@/services/service-imported-process/update";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { ImportedProcess } from "@shared/types/importedProcess";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let clientRepository: InMemoryClientsRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let sut: UpdateImportedProcessUseCase

let newImportedProcess: ImportedProcess

describe('Update Imported Process Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    clientRepository = new InMemoryClientsRepository();
    importedProcessRepository = new InMemoryImportedProcessRepository();

    sut = new UpdateImportedProcessUseCase(
      userRoleRepository,
      userRepository,
      clientRepository,
      importedProcessRepository
    )

    await makeUserRole(userRoleRepository, {
      id: 'user-role-admin',
      name: 'ADMIN',
      level: 1
    })

    await makeUser(userRepository, {
      id: 'user-admin',
      roleId: 'user-role-admin'
    })

    await makeClient(clientRepository, {
      id: 'client-test-1',
      responsibleById: 'user-normal',
      createdById: 'user-normal'
    })

    newImportedProcess = await makeImportedProcess(importedProcessRepository, {
      clientId: 'client-test-1',
      createdByUser: 'user-admin',
      updatedByUser: 'user-admin',
    })

    await makeImportedProcess(importedProcessRepository, {
      clientId: 'client-test-1',
      createdByUser: 'user-admin',
      updatedByUser: 'user-admin',
    })
  })


  it('should update an imported process', async () => {
    const updatedProcess = await sut.execute({
      id: newImportedProcess.id,
      clientId: newImportedProcess.clientId,
      userIdLogged: 'user-admin',
      brand: 'brand updated',
    })

    expect(updatedProcess.brand).toBe('brand updated')
  })


  it('should not update a non-existent imported process', async () => {
    await expect(() => sut.execute({
      id: 'imported-process-non-existent',
      clientId: newImportedProcess.clientId,
      userIdLogged: 'user-admin',
      holder: 'holder updated',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an imported process as a user with an invalid user role', async () => {
    await makeUser(userRepository, {
      id: 'user-normal-with-invalid-role',
      roleId: 'user-role-invalid'
    })

    await expect(() => sut.execute({
      id: newImportedProcess.id,
      clientId: newImportedProcess.clientId,
      userIdLogged: 'user-normal-with-invalid-role',
      holder: 'holder updated',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an imported process with an invalid user', async () => {
    await expect(() => sut.execute({
      id: newImportedProcess.id,
      clientId: newImportedProcess.clientId,
      userIdLogged: 'invalid-user',
      holder: 'holder updated',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an imported process with an invalid client', async () => {    
    await expect(() => sut.execute({
      id: newImportedProcess.id,
      clientId: 'invalid-client',
      userIdLogged: 'user-admin',
      holder: 'holder updated',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an imported process if the logged-in user is not an admin', async () => {
    await makeUserRole(userRoleRepository, {
      id: 'user-role-normal',
      name: 'NORMAL',
      level: 2
    })

    await makeUser(userRepository, {
      id: 'user-normal',
      roleId: 'user-role-normal'
    })

    await expect(() => sut.execute({
      id: newImportedProcess.id,
      clientId: newImportedProcess.clientId,
      userIdLogged: 'user-normal',
      holder: 'holder updated',
    })).rejects.toBeInstanceOf(UnauthorizedUserError)
  })
})