import { PrismaUserRepository } from "@/repositories/prisma/user";
import { ListOptionsUserUseCase } from "@/services/use-cases/user/list-options";


export function makeListWithOptionsUserUseCase() {
  const userRepository = new PrismaUserRepository();
  
  const useCase = new ListOptionsUserUseCase(userRepository);

  return useCase
}