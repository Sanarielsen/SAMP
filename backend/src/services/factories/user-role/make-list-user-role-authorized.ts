
import { PrismaUserRoleRepository } from '@/repositories/prisma/prisma-user-role-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserRoleUseCase } from '@/services/service-user-role/get'

export function makeListUserRoleAuthorizedUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserRoleUseCase(userRoleRepository, userRepository)

  return useCase
}