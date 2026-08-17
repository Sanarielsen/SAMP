import { UserRepository } from "@/repositories/user-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { EmailInvalidError } from "@/services/errors/email-invalid-error";

import { UpdateUserDTO } from "@shared/types/user";


export class UpdateUserProfileUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}
  
  async execute({
    ...data
  }: UpdateUserDTO): Promise<void> {

    const userLogged = await this.userRepository.findById(data.id)

    if (!userLogged) {
      throw new NonExistUserError();
    }

    if (data.email) {
      const userWithSameEmail =
        await this.userRepository.findByEmail(data.email!)

      if (!data.email.includes("@") || !data.email.includes(".com")) {
        throw new EmailInvalidError();
      }

      if (
        userWithSameEmail &&
        userWithSameEmail.id !== data.id
      ) {
        throw new UserAlreadyExistsError()
      }
    }

    await this.userRepository.update(data)
  }
}