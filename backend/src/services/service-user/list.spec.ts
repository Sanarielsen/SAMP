import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListUserUseCase } from "@/services/service-user/list";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { User } from "@shared/types/user";
import { UserRole } from "@shared/types/userRole";


let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: ListUserUseCase
let newUser: User
let newUserRole: UserRole

describe('List User Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository();
    userRoleRepository = new InMemoryUserRoleRepository();
    sut =  new ListUserUseCase(userRepository, userRoleRepository)
  })

  it('should allow an admin user to list all users', async () => {

    await makeUserRole(userRoleRepository, {
      id: 'user-role-test'
    })

    await makeUser(userRepository, {
      id: 'new-user'
    })
    await makeUser(userRepository)
    await makeUser(userRepository)

    const users = await sut.execute({
      id: 'new-user',
      search: ''
    })

    expect(users).toHaveLength(3)
  })

  it('should not allow an non admin user to list all users', async () => {

    await makeUserRole(userRoleRepository, {
      id: 'user-role-low', 
      level: 2
    })

    await makeUser(userRepository, {
      id: 'user-2',
      roleId: "user-role-low"
    })

    await expect(
      sut.execute({
        id: 'user-2',
        search: '',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedUserError)
  })

  it('should not allow listing with a non-existing role', async () => {

    await makeUser(userRepository, {
      id: 'user-2',
      roleId: "role-non-exist"
    })

    await expect(
      sut.execute({
        id: 'user-2',
        search: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not allow listing with a non-existing user', async () => {

    await expect(
      sut.execute({
        id: 'user-3',
        search: '',
      }),
    ).rejects.toBeInstanceOf(NonExistUserError)
  })
})