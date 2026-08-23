import { PrismaOrderTypeRepository } from "@/repositories/prisma/order-type";
import { CreateOrderTypeUseCase } from "@/services/use-cases/order-type/create";


export function makeCreateOrderTypeUseCase() {
  const orderTypeRepository = new PrismaOrderTypeRepository();

  return new CreateOrderTypeUseCase(
    orderTypeRepository
  );
}