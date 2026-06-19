import { RegisterUseCase } from "@/services/service-user/register";

import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";


export function makeRegisterUseCase() {
  const UserRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const registerUseCase = new RegisterUseCase(UserRepository, userRoleRepository);

  return registerUseCase
}