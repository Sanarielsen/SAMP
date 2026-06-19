import { ListUserUseCase } from "@/services/service-user/list";

import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";


export function makeListUserUseCase() {
  const userRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  
  const useCase = new ListUserUseCase(userRepository, userRoleRepository);

  return useCase
}