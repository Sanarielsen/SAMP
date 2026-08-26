import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteProcessPublicationUseCase } from "@/services/use-cases/process-publication/delete";
import { InMemoryUserRepository } from "@/repositories/in-memory/user";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/user-role";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/process-publication";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeProcessPublication } from "@/services/factories/process-publication/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { User } from "@shared/types/user";
import { UserRole } from "@shared/types/userRole";
import { ProcessPublication } from "@shared/types/processPublication";


let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: DeleteProcessPublicationUseCase

let newUser: User
let newUserRole: UserRole
let newProcessPublication: ProcessPublication

describe('Delete Process Publication Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository()
    userRoleRepository = new InMemoryUserRoleRepository()
    processPublicationRepository = new InMemoryProcessPublicationRepository()
    sut = new DeleteProcessPublicationUseCase(
      userRepository,
      userRoleRepository,
      processPublicationRepository
    )

    newUserRole = await makeUserRole( userRoleRepository, {
      level: 1
    })

    newUser = await makeUser( userRepository, {
      roleId: newUserRole.id
    })

    newProcessPublication = await makeProcessPublication( processPublicationRepository )
  })

  it('should soft delete an publication', async () => {
    await sut.execute(newProcessPublication.id, newUser.id)

    expect(processPublicationRepository.items[0]).not.toBe(null)
  })

  it('should not soft delete an non-existent publication', async () => {
    await expect(() => sut.execute(
      'non-existent-publication',
      newUser.id   
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete a process publication if the user has a non-existent role', async () => {
    const userWithInvalidRole = await makeUser( userRepository, {
      roleId: 'non-existent-role'
    })

    await expect(() => sut.execute(
      newProcessPublication.id,
      userWithInvalidRole.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete process publication with user with non-existent role', async () => {
    await expect(() => sut.execute(
      'non-existent-publication',
      'non-existent-user'
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