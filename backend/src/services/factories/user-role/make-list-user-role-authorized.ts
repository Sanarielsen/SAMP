
import { PrismaUserRoleRepository } from '@/repositories/prisma/prisma-user-role-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserRoleUseCase } from '@/services/service-user-role/get'

export function makeListUserRoleAuthorizedUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserRoleUseCase(userRoleRepository, userRepository)

  return useCase
}