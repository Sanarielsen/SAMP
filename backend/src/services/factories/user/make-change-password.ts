import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { UpdateUserPasswordUseCase } from "@/services/use-cases/user/update-password";


export function makeUpdateUserPasswordUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  
  return new UpdateUserPasswordUseCase(
    userRoleRepository,
    userRepository,
  )
}