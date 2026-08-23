import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaClientRepository } from "@/repositories/prisma/client";
import { ListOrdersWithOptionsUseCase } from "@/services/use-cases/order/list-options";


export function makeListOrderWithOptionsUseCase() {
  const orderRepository = new PrismaOrderRepository();
  const clientRepository = new PrismaClientRepository();

  const useCase = new ListOrdersWithOptionsUseCase(orderRepository, clientRepository);
  
  return useCase
}