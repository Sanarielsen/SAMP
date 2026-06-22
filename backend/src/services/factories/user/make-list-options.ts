import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { ListOptionsUserUseCase } from "@/services/service-user/list-options";


export function makeListWithOptionsUserUseCase() {
  const userRepository = new PrismaUserRepository();
  
  const useCase = new ListOptionsUserUseCase(userRepository);

  return useCase
}