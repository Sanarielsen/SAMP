import { AuthenticateUseCase } from "@/services/service-user/authenticate";

import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";


export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository, userRoleRepository);

  return authenticateUseCase
}