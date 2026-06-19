import { 
  expect, 
  describe, 
  it, 
  beforeEach,
} from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from '@/services/service-user/register'

import { makeUser } from '@/services/factories/user/make-entity'
import { makeUserRole } from '@/services/factories/user-role/make-entity'
import { InMemoryUserRoleRepository } from '@/repositories/in-memory/in-memory-user-role-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

import { User } from '@shared/types/user'


let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: RegisterUseCase
let newUser: User

describe('Register Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    userRoleRepository = new InMemoryUserRoleRepository()
    sut = new RegisterUseCase(userRepository, userRoleRepository)

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

  it('should be able to register', async () => {
    
    const user = await sut.execute({
      name: 'Samuel Henrique',
      email: 'teste@email.com',
      password: '123456',
      roleId: 'role-1'
    })
    
    expect(user.id).toEqual(expect.any(String))
  })


  it('should hash user password upon registration', async () => {

    const passwordShouldBeTested = '123456'

    const user = await sut.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@email.com',
      password: passwordShouldBeTested,
      roleId: 'role-1'
    })

    const isPasswordCorrectlyHashed = await compare(
      passwordShouldBeTested, 
      user.password_hash!
    )
    
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should should not be able to register with same email twice', async () => {

    const email = 'samuel.henrique@email.com'

    await sut.execute({
      name: 'Samuel Henrique',
      email: email,
      password: '123456',
      roleId: 'role-1'
    })

    await expect(() => sut.execute({
      name: 'Samuel Henrique',
      email: email,
      password: '123456',
      roleId: 'role-1'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not allow creating a user without a valid role', async () => {
    
    await expect(() => sut.execute({
      name: 'Teste Nome',
      email: 'teste@teste.com',
      password: '123456',
      roleId: 'role-20'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})