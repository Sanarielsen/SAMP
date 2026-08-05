import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { PostImportedProcessFromINPIUseCase } from "@/services/service-imported-process/post-from-inpi";
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
let sut: PostImportedProcessFromINPIUseCase

let newImportedProcess: ImportedProcess

describe('Post Imported Process From INPI Use Case', () => {
  beforeEach(async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    clientRepository = new InMemoryClientsRepository();
    importedProcessRepository = new InMemoryImportedProcessRepository()
    sut = new PostImportedProcessFromINPIUseCase(
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
    await makeUserRole(userRoleRepository, {
      id: 'user-role-normal',
      name: 'NORMAL',
      level: 2
    })

    await makeUser(userRepository, {
      id: 'user-admin',
      roleId: 'user-role-admin'
    })
    await makeUser(userRepository, {
      id: 'user-normal',
      roleId: 'user-role-normal'
    })

    await makeClient(clientRepository, {
      id: 'client-test-1',
      responsibleById: 'user-admin',
      createdById: 'user-admin'
    })

    await makeClient(clientRepository, {
      id: 'client-test-2',
      responsibleById: 'user-normal',
      createdById: 'user-normal'
    })

    newImportedProcess = await makeImportedProcess(importedProcessRepository, {
      clientId: 'client-test-1'
    })
  })

  it('should create a imported process', async () => {
    const newData = await sut.execute({
      ...newImportedProcess,
      userIdLogged: 'user-admin'
    })

    expect(newData.brand).toBe('Marca test')
  })

  it('should not create an imported process as a user with an invalid user role', async () => {
    await makeUser(userRepository, {
      id: 'user-normal-with-invalid-role',
      roleId: 'user-role-invalid'
    })

    await expect(() => sut.execute({
      ...newImportedProcess,
      userIdLogged: 'user-normal-with-invalid-role'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create an imported process with an invalid user', async () => {
    await expect(() => sut.execute({
      ...newImportedProcess,
      userIdLogged: 'invalid-user'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create an imported process with an invalid client', async () => {    
    await expect(() => sut.execute({
      ...newImportedProcess,
      userIdLogged: 'user-admin',
      clientId: 'invalid-client',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create an imported process if the logged-in user is not an admin', async () => {
    await expect(() => sut.execute({
      ...newImportedProcess,
      userIdLogged: 'user-normal',
      clientId: 'client-test-1',
    })).rejects.toBeInstanceOf(UnauthorizedUserError)
  })
})