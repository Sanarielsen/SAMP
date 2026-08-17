import { GetUserProfileUseCase } from '@/services/use-cases/user/get-profile'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'


export function makeGetUserProfileUseCase() {
  const UserRepository = new PrismaUserRepository()
  const GetProfileUseCase = new GetUserProfileUseCase(UserRepository)

  return GetProfileUseCase
}