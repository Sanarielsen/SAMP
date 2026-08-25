import { ListOrderUseCase } from "@/services/use-cases/order/list";

import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaUserRepository } from "@/repositories/prisma/user";


export function makeListOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new ListOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}