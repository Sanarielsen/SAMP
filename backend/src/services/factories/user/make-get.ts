import { GetUserProfileUseCase } from '@/services/service-user/get-profile'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'


export function makeGetUserProfileUseCase() {
  const UserRepository = new PrismaUserRepository()
  const GetProfileUseCase = new GetUserProfileUseCase(UserRepository)

  return GetProfileUseCase
}