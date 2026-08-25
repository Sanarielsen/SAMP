import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteUserUseCase } from "@/services/use-cases/user/delete";
import { InMemoryUserRepository } from "@/repositories/in-memory/user";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/user-role";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
import { User } from "@shared/types/user";
import { UserRole } from "@shared/types/userRole";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

let newUserRoleAdmin: UserRole
let newUserAdmin: User

describe('Delete User Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository()
    userRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(
      userRoleRepository,
      userRepository,
    )

    newUserRoleAdmin = await makeUserRole( userRoleRepository, {
      level: 1
    } )

    newUserAdmin = await makeUser( userRepository, {
      roleId: newUserRoleAdmin.id
    } )
  })

  it('should soft delete a user', async () => {
    const newUserRole = await makeUserRole( userRoleRepository, {
      level: 3
    } )
    
    const newUser = await makeUser( userRepository, {
      roleId: newUserRole.id
    } )

    await sut.execute( newUserAdmin.id, newUser.id )

    expect(userRepository.items[0]).not.toBe(null)
  })

  it('should not soft delete a non-existent user', async () => {
    await expect(() => sut.execute(
      'invalid-user-logged',
      'invalid-user'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete with non-existent user logged', async () => {
    await expect(() => sut.execute(
      newUserAdmin.id,
      'invalid-user'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete a user with a non-existent role', async () => {
    const newUserRole = await makeUserRole( userRoleRepository, {
      level: 3
    } )

    const newUserWithInvalidRole = await makeUser( userRepository, {
      roleId: 'invalid-user-role'
    } )

    await expect(() => sut.execute(
      newUserWithInvalidRole.id,
      newUserRole.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not soft delete a user when the logged-in user is not an admin', async () => {

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