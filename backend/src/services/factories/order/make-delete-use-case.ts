import { DeleteOrderUseCase } from "@/services/service-orders/delete";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

export function makeDeleteOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();

  const useCase = new DeleteOrderUseCase(
    orderRepository
  );
  
  return useCase
}