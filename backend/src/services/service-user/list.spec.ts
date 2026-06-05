import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { hash } from "bcryptjs";

import { ListUserUseCase } from "@/services/service-user/list";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

let userRepository: InMemoryUsersRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: ListUserUseCase

describe('List User Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUsersRepository();
    userRoleRepository = new InMemoryUserRoleRepository();
    sut =  new ListUserUseCase(userRepository, userRoleRepository)

    await userRoleRepository.create({
      id: 'role-1',
      name: 'Cargo Teste',
      createdAt: new Date(Date.now()),
      description: 'Descricao do cargo teste',
      level: 1
    })

    await userRoleRepository.create({
      id: 'role-2',
      name: 'Cargo Teste',
      createdAt: new Date(Date.now()),
      description: 'Descricao do cargo teste',
      level: 2
    })

  })

  it('should allow an admin user to list all users', async () => {

    await userRepository.create({
      id: 'user-1',
      name: 'Usuario Teste',
      email: 'teste@email.com',
      password_hash: await hash('123456', 6),
      roleId: "role-1"
    })

    await userRepository.create({
      id: 'user-2',
      name: 'Usuario Teste 2',
      email: 'teste2@email.com',
      password_hash: await hash('123456', 6),
      roleId: "role-1"
    })

    await userRepository.create({
      id: 'user-3',
      name: 'Usuario Teste 3',
      email: 'teste3@email.com',
      password_hash: await hash('123456', 6),
      roleId: "role-1"
    })

    const users = await sut.execute({
      id: 'user-1',
      search: ''
    })

    expect(users).toHaveLength(3)
  })

  it('should not allow an non admin user to list all users', async () => {

    await userRepository.create({
      id: 'user-2',
      name: 'Usuario Teste 2',
      email: 'teste2@email.com',
      password_hash: await hash('123456', 6),
      roleId: "role-2"
    })

    await expect(
      sut.execute({
        id: 'user-2',
        search: '',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedUserError)
  })

  it('should not allow listing with a non-existing role', async () => {

    await userRepository.create({
      id: 'user-2',
      name: 'Usuario Teste 2',
      email: 'teste2@email.com',
      password_hash: await hash('123456', 6),
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
        id: 'user-2',
        search: '',
      }),
    ).rejects.toBeInstanceOf(NonExistUserError)
  })
})