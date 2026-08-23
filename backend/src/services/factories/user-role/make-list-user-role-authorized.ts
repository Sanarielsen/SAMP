import { PrismaUserRoleRepository } from '@/repositories/prisma/user-role'
import { PrismaUserRepository } from '@/repositories/prisma/user'
import { GetUserRoleUseCase } from '@/services/use-cases/user-role/get'


export function makeListUserRoleAuthorizedUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserRoleUseCase(userRoleRepository, userRepository)

  return useCase
}