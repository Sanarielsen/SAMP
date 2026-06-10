import { GetOrderDetailUseCase } from "@/services/service-orders/get-detail";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";


export function makeGetOrderDetailUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const useCase = new GetOrderDetailUseCase(orderRepository);
  
  return useCase
}