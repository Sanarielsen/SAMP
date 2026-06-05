import { 
  expect, 
  describe, 
  it, 
  beforeEach, 
  vi, 
  afterEach 
} from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/services/service-user/register'

import { InMemoryUserRoleRepository } from '@/repositories/in-memory/in-memory-user-role-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    userRoleRepository = new InMemoryUserRoleRepository()
    sut = new RegisterUseCase(usersRepository, userRoleRepository)

    await userRoleRepository.create({
      id: "role-1",
      name: 'USER',
      description: 'role registered by tests',
      level: 3,
      createdAt: new Date(Date.now()),
    })

    await userRoleRepository.create({
      id: "role-2",
      name: 'ADMIN',
      description: 'role admin registered by tests',
      level: 1,
      createdAt: new Date(Date.now()),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

    const user = await sut.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@email.com',
      password: '123456',
      roleId: 'role-1'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
    
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

  it('should not allow creating a user without a USER role', async () => {

    await userRoleRepository.create({
      id: "role-4",
      name: 'ERROR',
      description: 'role registered by tests',
      level: 3,
      createdAt: new Date(Date.now()),
    })

    await sut.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@email.com',
      password: '123456',
      roleId: 'role-1'
    })
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