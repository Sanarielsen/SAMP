import { 
  expect, 
  describe, 
  it, 
  beforeEach 
} from 'vitest';

import { makeUser } from '@/services/factories/user/make-entity';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { GetUserProfileUseCase } from '@/services/service-user/get-profile';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

import { User } from '@shared/types/user'


let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
let newUser: User

describe('Get User Profile Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)

    newUser = await makeUser(userRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await sut.execute({
      userId: newUser.id
    })
    
    expect(user.name).toEqual("user-test")
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => sut.execute({
      userId: "non-existing-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return null when user does not exist by id', async () => {
    const user = await userRepository.findById('user-999')

    expect(user).toBeNull()
  })
})