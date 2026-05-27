import { DeleteOrderUseCase } from "@/services/service-orders/delete";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeDeleteOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();

  const useCase = new DeleteOrderUseCase(
    orderRepository
  );
  
  return useCase
}