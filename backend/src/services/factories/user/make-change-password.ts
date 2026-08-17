import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { UpdateUserPasswordUseCase } from "@/services/use-cases/user/update-password";

export function makeUpdateUserPasswordUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  
  return new UpdateUserPasswordUseCase(
    userRoleRepository,
    userRepository,
  )
}