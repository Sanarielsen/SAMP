import { CreateOrderUseCase } from "@/services/service-orders/post";

import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makePostOrderUseCase() {
  const userRepository = new PrismaUsersRepository();
  const clientRepository = new PrismaClientRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new CreateOrderUseCase(
    userRepository, 
    clientRepository,
    orderRepository
  );
  
  return useCase
}