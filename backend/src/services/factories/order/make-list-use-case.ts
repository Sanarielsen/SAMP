import { ListOrderUseCase } from "@/services/service-orders/list";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

export function makeListOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new ListOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}