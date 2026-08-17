import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { compare } from "bcryptjs";

import { UpdateUserPasswordUseCase } from "@/services/use-cases/user/update-password";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let sut: UpdateUserPasswordUseCase

describe('Update User Password Use Case', () => {
  beforeEach(() => {

    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    sut = new UpdateUserPasswordUseCase(
      userRoleRepository,
      userRepository
    )
  })

  it("should update a user's password", async () => {
    await makeUserRole( userRoleRepository, {
      id: 'user-role-normal',
      level: 2,
    })
    await makeUser( userRepository, {
      id: 'user-normal',
      roleId: 'user-role-normal'
    } )

    await sut.execute({
      id: 'user-normal',
      userLoggedId: 'user-normal',
      password: 'test-new-password',
      confirm: 'test-new-password',
    })

    const userUpdated = await userRepository.findById('user-normal')

    const matches = await compare(
      'test-new-password',
      userUpdated!.password_hash as string,
    )

    expect(matches).toBe(true)
  })

  it("should not update the password when the password and confirm are different", async () => {
    await expect(() => sut.execute({
      id: 'user-normal',
      userLoggedId: 'user-normal',
      password: 'password-test',
      confirm: 'password-test-different',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not update the password of a non-existent user', async () => {
    await expect(() => sut.execute({
      id: 'user-invalid',
      userLoggedId: 'user-invalid',
      password: 'password-test',
      confirm: 'password-test',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  
  it("should not update the password when the user has a non-existent role", async () => {
    await makeUser( userRepository, {
      id: 'user-normal',
      roleId: 'invalid-user-role-normal'
    } )

    await expect(() => sut.execute({
      id: 'user-normal',
      userLoggedId: 'user-normal',
      password: 'password-test',
      confirm: 'password-test',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  
  it("should not update another user's password if the user is not an admin", async () => {

    await makeUserRole( userRoleRepository, {
      id: 'user-role-normal',
      level: 2,
    })
    await makeUser( userRepository, {
      id: 'user-normal',
      roleId: 'user-role-normal'
    } )
    await makeUser( userRepository, {
      id: 'user-normal-different',
      roleId: 'user-role-normal'
    } )

    await expect(() => sut.execute({
      id: 'user-normal-different',
      userLoggedId: 'user-normal',
      password: 'password-test',
      confirm: 'password-test',
    })).rejects.toBeInstanceOf(UnauthorizedUserError)
  })

})