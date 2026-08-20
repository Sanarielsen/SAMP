import { 
  expect, 
  describe, 
  it, 
  beforeEach,
} from 'vitest'

import { CreateUserUseCase } from '@/services/service-user/create-without-password'
import { InMemoryUserRoleRepository } from '@/repositories/in-memory/in-memory-user-role-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { makeUser } from '@/services/factories/user/make-entity'
import { makeUserRole } from '@/services/factories/user-role/make-entity'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

import { User } from '@shared/types/user'


let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: CreateUserUseCase
let newUser: User

describe('Register Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    userRoleRepository = new InMemoryUserRoleRepository()
    sut = new CreateUserUseCase(userRepository, userRoleRepository)

    await makeUserRole(userRoleRepository, {
      id: "role-1",
      name: 'USER',
      description: 'role registered by tests',
      level: 3,
      createdAt: new Date(Date.now()),
    })

    await makeUserRole(userRoleRepository, {
      id: "role-2",
      name: 'ADMIN',
      description: 'role admin registered by tests',
      level: 1,
      createdAt: new Date(Date.now()),
    })

    newUser = await makeUser(userRepository)
  })

  it('should create user without password', async () => {
    
    const user = await sut.execute({
      name: 'Samuel Henrique',
      email: 'teste@email.com',
      roleId: 'role-1'
    })
    
    expect(user.id).toEqual(expect.any(String))
  })

  it('should should not be able to register with same email twice', async () => {

    const email = 'samuel.henrique@email.com'

    await sut.execute({
      name: 'Samuel Henrique',
      email: email,
      roleId: 'role-1'
    })

    await expect(() => sut.execute({
      name: 'Samuel Henrique',
      email: email,
      roleId: 'role-1'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not allow creating a user without a valid role', async () => {
    
    await expect(() => sut.execute({
      name: 'Teste Nome',
      email: 'teste@teste.com',
      roleId: 'role-20'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})