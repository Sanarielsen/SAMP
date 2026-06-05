import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/services/service-user/register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const registerUseCase = new RegisterUseCase(usersRepository, userRoleRepository);

  return registerUseCase
}