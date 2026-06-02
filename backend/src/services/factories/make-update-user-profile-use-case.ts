import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UpdateUserProfileUseCase } from "@/services/service-user/update"


export function makeUpdateUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserProfileUseCase(userRepository)

  return useCase
}