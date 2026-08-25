import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role";
import { PrismaUserRepository } from "@/repositories/prisma/user";
import { ListUserUseCase } from "@/services/use-cases/user/list";


export function makeListUserUseCase() {
  const userRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  
  const useCase = new ListUserUseCase(userRepository, userRoleRepository);

  return useCase
}