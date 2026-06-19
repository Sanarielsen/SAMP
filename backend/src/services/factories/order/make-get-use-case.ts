import { GetOrderUseCase } from "@/services/service-orders/get";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

export function makeGetOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new GetOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}