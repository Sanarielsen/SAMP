import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { UpdateUserProfileUseCase } from "@/services/service-user/update"


export function makeUpdateUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new UpdateUserProfileUseCase(userRepository)

  return useCase
}