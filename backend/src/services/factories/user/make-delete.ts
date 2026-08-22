import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { DeleteUserUseCase } from "@/services/use-cases/user/delete"


export function makeDeleteUser() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()

  return new DeleteUserUseCase(
    userRoleRepository,
    userRepository
  )
}