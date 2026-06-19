import { 
  expect, 
  describe, 
  it, 
  beforeEach
} from 'vitest';

import { makeUser } from '@/services/factories/user/make-entity';
import { makeUserRole } from '@/services/factories/user-role/make-entity';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InMemoryUserRoleRepository } from '@/repositories/in-memory/in-memory-user-role-repository';
import { AuthenticateUseCase } from '@/services/service-user/authenticate';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

import { User } from '@shared/types/user';

let userRepository: InMemoryUserRepository
let userRoleRepository: InMemoryUserRoleRepository
let sut: AuthenticateUseCase
let newUser: User

describe('Authenticate Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository()
    userRoleRepository = new InMemoryUserRoleRepository()
    sut = new AuthenticateUseCase(userRepository, userRoleRepository)

    await makeUserRole(userRoleRepository, {
      id: 'user-role-test',
    })
    newUser = await makeUser(userRepository)
  })

  it('should be able to authenticate', async () => {

    const user = await sut.execute({
      email: newUser.email,
      password: '123456',
    })
    
    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'test-invalid-email@test.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await expect(() => sut.execute({
      email: newUser.email,
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with non-existed role', async () => {

    const userValidWithInvalidRole = await makeUser(userRepository, {
      email: 'testRole@email.com',
      roleId: 'invalid-role',
    })

    await expect(() => sut.execute({
      email: userValidWithInvalidRole.email,
      password: '123456',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})