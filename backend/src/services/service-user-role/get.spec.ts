import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";

import { hash } from "bcryptjs";

import { GetUserRoleUseCase } from "@/services/service-user-role/get";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUsersRepository
let sut: GetUserRoleUseCase

describe('Get User Role Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository()
    userRepository =  new InMemoryUsersRepository();
    sut = new GetUserRoleUseCase(userRoleRepository, userRepository)
    
    await userRoleRepository.create({
      id: 'role-1',
      name: 'admin',
      description: 'admin to test',
      level:  1,
      createdAt: new Date(Date.now())
    })

    await userRoleRepository.create({
      id: 'role-2',
      name: 'user',
      description: 'user to test',
      level:  2,
      createdAt: new Date(Date.now())
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should query available roles', async () => {

    await userRepository.create({
      id: 'user-1',
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      roleId: 'role-1',
      password_hash: await hash('123456', 6),
    })

    const userRolesAvaliables = await sut.execute({
      userId: 'user-1'
    })

    expect(userRolesAvaliables).toHaveLength(2)
  })

  it('should query only permitted roles when the user is not an admin', async () => {

    await userRepository.create({
      id: 'user-1',
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      roleId: 'role-2',
      password_hash: await hash('123456', 6),
    })

    const userRolesAvaliables = await sut.execute({
      userId: 'user-1'
    })

    expect(userRolesAvaliables).toHaveLength(1)
  })

  it('should not query when the current user doesnt exist', async () => {

    await expect(() => sut.execute({
      userId: 'non-exist-user'
    })).rejects.toBeInstanceOf(NonExistUserError)
  })

  it('should not query when the current user have a invalid role', async () => {

    await userRepository.create({
      id: 'user-1',
      name: 'Samuel de Paula',
      email: 'samuel@gmail.com',
      roleId: 'role-invalid',
      password_hash: await hash('123456', 6),
    })

    await expect(() => sut.execute({
      userId: 'user-1'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

