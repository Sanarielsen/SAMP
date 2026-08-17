import { GetOrderDetailUseCase } from "@/services/use-cases/order/get-detail";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";


export function makeGetOrderDetailUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const useCase = new GetOrderDetailUseCase(orderRepository);
  
  return useCase
}