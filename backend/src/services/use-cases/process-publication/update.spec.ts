import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdateProcessPublicationUseCase } from "@/services/use-cases/process-publication/update";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/imported-process";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/process-publication";
import { InMemoryUserRepository } from "@/repositories/in-memory/user";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/user-role";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { makeProcessPublication } from "@/services/factories/process-publication/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { UserRole } from "@shared/types/userRole";
import { User } from "@shared/types/user";
import { ImportedProcess } from "@shared/types/importedProcess";
import { ProcessPublication } from "@shared/types/processPublication";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: UpdateProcessPublicationUseCase

let newUserRoleAdmin: UserRole
let newUserAdmin: User
let newImportedProcess: ImportedProcess
let newProcessPublication: ProcessPublication

describe('Update Process Publication Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    importedProcessRepository = new InMemoryImportedProcessRepository();
    processPublicationRepository = new InMemoryProcessPublicationRepository();

    sut = new UpdateProcessPublicationUseCase(
      userRoleRepository,
      userRepository,
      importedProcessRepository,
      processPublicationRepository
    )

    newUserRoleAdmin = await makeUserRole( userRoleRepository, {
      name: 'ADMIN-TEST',
      level: 1
    })

    newUserAdmin = await makeUser( userRepository, {
      name: 'USER-TEST',
      roleId: newUserRoleAdmin.id
    })

    newImportedProcess = await makeImportedProcess( importedProcessRepository, {
      createdByUser: newUserAdmin.id
    })

    newProcessPublication = await makeProcessPublication( processPublicationRepository )
  })

  it('should update an publication', async () => {

    const fieldUpdated = 'complement-updated'
    
    const updatedProcessPublication = await sut.execute({
      id: newProcessPublication.id,
      updatedByUser: newUserAdmin.id,
      complement: fieldUpdated
    })

    expect(updatedProcessPublication.complement).toBe(fieldUpdated)
  })

  it('should not create any publication with non-existent publication', async () => {
    await expect(() => sut.execute({
      id: 'non-existent-publication',
      updatedByUser: newUserAdmin.id,
      complement: 'make-an-error'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create any publication with non-existent imported process', async () => {
    await expect(() => sut.execute({
      id: newProcessPublication.id,
      importedProcessId: 'non-existent-process',
      updatedByUser: newUserAdmin.id,
      complement: 'make-an-error'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update any publication using user with invalid user role', async () => {

    const userWithInvalidRole = await makeUser( userRepository, {
      name: 'USER-TEST',
      roleId: 'non-existent-user-role'
    })

    await expect(() => sut.execute({
      id: newProcessPublication.id,
      updatedByUser: userWithInvalidRole.id,
      complement: 'make-an-error'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create any publication with non-existent user', async () => {
    await expect(() => sut.execute({
      id: newProcessPublication.id,
      updatedByUser: 'non-existent-user',
      complement: 'make-an-error'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create any publication using user non-admin', async () => {

    const newUserRoleNonAdmin = await makeUserRole( userRoleRepository, {
      name: 'user-role-non-admin',
      level: 2
    })

    const userNonAdmin = await makeUser( userRepository, {
      name: 'user-non-admin',
      roleId: newUserRoleNonAdmin.id
    })

    await expect(() => sut.execute({
      id: newProcessPublication.id,
      updatedByUser: userNonAdmin.id,
      complement: 'make-an-error'
    })).rejects.toBeInstanceOf(UnauthorizedUserError)
  })
})