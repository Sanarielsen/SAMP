import { UsersRepository } from "@/repositories/users-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { EmailInvalidError } from "@/services/errors/email-invalid-error";

import { UpdateUserDTO, User } from "@shared/types/user";


export class UpdateUserProfileUseCase {
  constructor(
    private userRepository: UsersRepository
  ) {}
  
  async execute({
    ...data
  }: UpdateUserDTO): Promise<User> {

    const userLogged = await this.userRepository.findById(data.id)

    if (!userLogged) {
      throw new NonExistUserError();
    }

    if (data.email) {
      const userWithSameEmail =
        await this.userRepository.findByEmail(data.email!)

      if (
        userWithSameEmail &&
        userWithSameEmail.id !== data.id
      ) {
        throw new UserAlreadyExistsError()
      }
    }

    if (data.email && !data.email.includes("@")) {
      throw new EmailInvalidError();
    }

    const updatedUser = await this.userRepository.update(data)

    return updatedUser
  }
}