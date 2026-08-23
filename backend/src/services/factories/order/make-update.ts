import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { UpdateOrderUseCase } from "@/services/use-cases/order/update";


export function makeUpdateOrderUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const useCase = new UpdateOrderUseCase(orderRepository);
  
  return useCase
}