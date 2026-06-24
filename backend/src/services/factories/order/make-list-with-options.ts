import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { ListOrdersWithOptionsUseCase } from "@/services/service-orders/list-options";

export function makeListOrderWithOptionsUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const clientRepository = new PrismaClientRepository();

  const useCase = new ListOrdersWithOptionsUseCase(orderRepository, clientRepository);
  
  return useCase
}