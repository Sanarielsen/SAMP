import { UserRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

import { UserPublicDTO } from '@shared/types/user'


interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<UserPublicDTO> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}