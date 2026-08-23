import { PrismaUserRepository } from "@/repositories/prisma/user"
import { UpdateUserProfileUseCase } from "@/services/use-cases/user/update"


export function makeUpdateUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new UpdateUserProfileUseCase(userRepository)

  return useCase
}