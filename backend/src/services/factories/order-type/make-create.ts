import { PrismaOrderTypeRepository } from "@/repositories/prisma/order-type";
import { CreateOrderTypeUseCase } from "@/services/service-order-type/create";


export function makeCreateOrderType() {
  const orderTypeRepository = new PrismaOrderTypeRepository();

  return new CreateOrderTypeUseCase(
    orderTypeRepository
  );
}