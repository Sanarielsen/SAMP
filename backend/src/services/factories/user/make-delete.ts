import { PrismaUserRepository } from "@/repositories/prisma/user"
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { DeleteUserUseCase } from "@/services/use-cases/user/delete"


export function makeDeleteUserUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()

  return new DeleteUserUseCase(
    userRoleRepository,
    userRepository
  )
}