import { PrismaUserRepository } from '@/repositories/prisma/user'
import { GetUserProfileUseCase } from '@/services/use-cases/user/get-profile'


export function makeGetUserProfileUseCase() {
  const UserRepository = new PrismaUserRepository()
  const GetProfileUseCase = new GetUserProfileUseCase(UserRepository)

  return GetProfileUseCase
}