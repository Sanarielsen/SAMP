import { ListOrderUseCase } from "@/services/service-orders/list";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeListOrderUseCase() {
  const userRepository = new PrismaUsersRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new ListOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}