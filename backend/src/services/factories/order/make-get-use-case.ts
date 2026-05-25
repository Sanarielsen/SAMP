import { GetOrderUseCase } from "@/services/service-orders/get";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetOrderUseCase() {
  const userRepository = new PrismaUsersRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new GetOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}