import { PrismaClientRepository } from "@/repositories/prisma/client";
import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaUserRepository } from "@/repositories/prisma/user";

import { CreateOrderUseCase } from "@/services/use-cases/order/post";


export function makePostOrderUseCase() {
  const userRepository = new PrismaUserRepository();
  const clientRepository = new PrismaClientRepository();
  const orderRepository = new PrismaOrderRepository();

  const useCase = new CreateOrderUseCase(
    userRepository, 
    clientRepository,
    orderRepository
  );
  
  return useCase
}