import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/services/service-user/get-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const GetProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return GetProfileUseCase
}