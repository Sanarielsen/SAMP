import { ListUserUseCase } from "@/services/service-user/list";

import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";


export function makeListUserUseCase() {
  const userRepository = new PrismaUsersRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  
  const useCase = new ListUserUseCase(userRepository, userRoleRepository);

  return useCase
}