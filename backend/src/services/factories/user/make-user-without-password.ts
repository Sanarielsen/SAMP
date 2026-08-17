import { GetUserProfileUseCase } from '@/services/use-cases/user/get-profile'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserUseCase } from '@/services/use-cases/user/create-without-password'
import { PrismaUserRoleRepository } from '@/repositories/prisma/prisma-user-role-repository'


export function makeCreateUserWithoutPassword() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()

  return new CreateUserUseCase(
    userRepository,
    userRoleRepository,
  )
}