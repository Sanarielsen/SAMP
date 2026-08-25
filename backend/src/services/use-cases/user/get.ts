import { UserRepository } from '@/repositories/user'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

import { UpdateUserWithPasswordDTO } from '@shared/types/user'


export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UpdateUserWithPasswordDTO> {
    const user = await this.userRepository.findByIdWithoutPassword(id)
    if (!user) throw new ResourceNotFoundError()

    return user
  }
}