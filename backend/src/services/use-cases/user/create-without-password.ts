import { UserRepository } from "@/repositories/user"
import { UserRoleRepository } from "@/repositories/user-role"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists"
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

import { CreateUserWithoutPasswordDTO, User } from "@shared/types/user"


export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async execute( data: CreateUserWithoutPasswordDTO ): Promise<User> {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email)

    if (userWithSameEmail) throw new UserAlreadyExistsError();
    
    const userRole = await this.userRoleRepository.findById(data.roleId)

    if (!userRole) throw new ResourceNotFoundError();
    
    return await this.userRepository.createWithoutPassword(data)
  }
}
