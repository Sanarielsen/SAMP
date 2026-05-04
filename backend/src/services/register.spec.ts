import { RegisterUseCase } from './register'

import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    })

    const { user } = await registerUseCase.execute({
      name: 'Samuel Henrique',
      email: 'samuel.henrique@emai.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
    
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})