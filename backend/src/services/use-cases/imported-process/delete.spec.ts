import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteImportedProcessUseCase } from "@/services/use-cases/imported-process/delete";
import { InMemoryUserRepository } from "@/repositories/in-memory/user";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/user-role";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/imported-process";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { User } from "@shared/types/user";
import { UserRole } from "@shared/types/userRole";
import { ImportedProcess } from "@shared/types/importedProcess";


let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let sut: DeleteImportedProcessUseCase

let newUser: User
let newUserRole: UserRole
let newImportedProcess: ImportedProcess


describe('Delete Imported Process Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository
    userRoleRepository = new InMemoryUserRoleRepository
    importedProcessRepository = new InMemoryImportedProcessRepository
    sut = new DeleteImportedProcessUseCase(
      userRepository,
      userRoleRepository,
      importedProcessRepository
    )

    newUserRole = await makeUserRole( userRoleRepository, {
      level: 1
    })

    newUser = await makeUser( userRepository, {
      roleId: newUserRole.id
    })

    newImportedProcess = await makeImportedProcess( importedProcessRepository )
  })

  it('should delete imported process', async () => {  
    await sut.execute(newImportedProcess.id, newUser.id)

    expect(newImportedProcess.deletedAt).not.toBe(null)
  })

  it('should not delete a non-existent imported process', async () => {  
    await expect(() => sut.execute(
      'imported-process-id-non-existent',
      newUser.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft update process publication with non-existent user', async () => {
    await expect(() => sut.execute(
      newImportedProcess.id,
      'non-existent-user'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft update process publication if the user has a non-existent role', async () => {
    const userWithInvalidRole = await makeUser( userRepository, {
      roleId: 'non-existent-role'
    })

    await expect(() => sut.execute(
      newImportedProcess.id,
      userWithInvalidRole.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete a process publication when the logged-in user is not an admin', async () => {
  
    const newUserRole = await makeUserRole( userRoleRepository, {
      level: 2
    } )
    
    const newUserNonAdmin = await makeUser( userRepository, {
      roleId: newUserRole.id
    } )

    const newUser = await makeUser( userRepository, {
      roleId: newUserRole.id
    } )
    
    await expect(() => sut.execute(
      newUserNonAdmin.id,
      newUser.id
    )).rejects.toBeInstanceOf(UnauthorizedUserError)
  })
})