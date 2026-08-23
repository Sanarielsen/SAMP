import { GetOrderUseCase } from "@/services/use-cases/order/get";

import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaUserRepository } from "@/repositories/prisma/user";


export function makeGetOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new GetOrderUseCase(
    userRepository, 
    orderRepository
  );
  
  return useCase
}