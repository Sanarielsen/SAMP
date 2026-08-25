import { DeleteOrderUseCase } from "@/services/use-cases/order/delete";

import { PrismaOrderRepository } from "@/repositories/prisma/order";


export function makeDeleteOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();

  const useCase = new DeleteOrderUseCase(
    orderRepository
  );
  
  return useCase
}