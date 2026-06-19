import { CreateOrderUseCase } from "@/services/service-orders/post";

import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

export function makePostOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const clientRepository = new PrismaClientRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new CreateOrderUseCase(
    userRepository, 
    clientRepository,
    orderRepository
  );
  
  return useCase
}