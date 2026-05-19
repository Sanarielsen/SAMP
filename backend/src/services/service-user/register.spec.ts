import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/services/service-user/register'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    
    const { user } = await sut.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@emai.com',
      password: '123456',
    })
    
    expect(user.id).toEqual(expect.any(String))
  })


  it('should hash user password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@emai.com',
      password: '123456',
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
    })

    await expect(() => sut.execute({
      name: 'Samuel Henrique',
      email: email,
      password: '123456',
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})