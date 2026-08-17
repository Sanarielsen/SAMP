import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { UpdateOrderUseCase } from "@/services/use-cases/order/update";

export function makeUpdateOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const useCase = new UpdateOrderUseCase(orderRepository);
  
  return useCase
}