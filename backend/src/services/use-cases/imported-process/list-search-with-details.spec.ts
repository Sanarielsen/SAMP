import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListImportedProcessSearchWithDetailsUseCase } from "@/services/use-cases/imported-process/list-search-with-details";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { UserRole } from "@shared/types/userRole";
import { User } from "@shared/types/user";
import { ImportedProcess } from "@shared/types/importedProcess";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let sut: ListImportedProcessSearchWithDetailsUseCase

let newUserRole: UserRole
let newUser: User
let newImportProcess: ImportedProcess


describe('List Imported Process Search With Details', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    importedProcessRepository = new InMemoryImportedProcessRepository();

    sut = new ListImportedProcessSearchWithDetailsUseCase(
      userRoleRepository,
      userRepository,
      importedProcessRepository
    )

    newUserRole = await makeUserRole( userRoleRepository, {
      name: 'user-role-name',
      level: 2
    })

    newUser = await makeUser( userRepository, {
      name: 'user-normal',
      roleId: newUserRole.id
    })
  })

  it('should query imported processes', async () => {

    await makeImportedProcess( importedProcessRepository, {
      clientId: 'client-id-test',
      brand: 'Marca Test 1'
    } )

    await makeImportedProcess( importedProcessRepository, {
      clientId: 'client-id-test',
      brand: 'Marca Test 2'
    } )

    await makeImportedProcess( importedProcessRepository, {
      clientId: 'client-id-test',
      brand: 'Marca Test 3'
    } )

    await makeImportedProcess( importedProcessRepository, {
      clientId: 'client-id-test',
      brand: 'Outra marca'
    } )
    
    const importedProcess = await sut.execute(
      'Test',
      newUser.id
    )

    expect(importedProcess).toHaveLength(3)
  })

  it('should not query imported processes with a non-existent user', async () => {
    await expect(() => sut.execute(
      'test', 'invalid-user'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not query imported processes if the user has a non-existent role', async () => {

    const newUserWithInvalidRole = await makeUser( userRepository, {
      name: 'user-normal-with-invalid-role',
      roleId: 'invalid-user-role-id'
    })

    await expect(() => sut.execute(
      'test', newUserWithInvalidRole.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})