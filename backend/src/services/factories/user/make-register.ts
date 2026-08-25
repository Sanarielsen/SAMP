import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role";
import { RegisterUseCase } from "@/services/use-cases/user/register";


export function makeRegisterUseCase() {
  const UserRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const registerUseCase = new RegisterUseCase(UserRepository, userRoleRepository);

  return registerUseCase
}