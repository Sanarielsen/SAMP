import { UserRepository } from '@/repositories/user-repository'

import { OptionsControlledBox } from '@shared/types/values'


export class ListOptionsUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<OptionsControlledBox[] | null> {
    return await this.userRepository.findManyOptions();
  }
}