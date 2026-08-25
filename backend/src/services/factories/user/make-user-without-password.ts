import { PrismaUserRepository } from '@/repositories/prisma/user'
import { PrismaUserRoleRepository } from '@/repositories/prisma/user-role'
import { CreateUserUseCase } from '@/services/use-cases/user/create-without-password'


export function makeCreateUserWithoutPasswordUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()

  return new CreateUserUseCase(
    userRepository,
    userRoleRepository,
  )
}