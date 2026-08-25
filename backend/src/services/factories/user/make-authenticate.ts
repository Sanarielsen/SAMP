import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role";
import { AuthenticateUseCase } from "@/services/use-cases/user/authenticate";


export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository, userRoleRepository);

  return authenticateUseCase
}