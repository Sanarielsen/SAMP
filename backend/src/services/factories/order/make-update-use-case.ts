import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { UpdateOrderUseCase } from "@/services/service-orders/update";

export function makeUpdateOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const useCase = new UpdateOrderUseCase(orderRepository);
  
  return useCase
}