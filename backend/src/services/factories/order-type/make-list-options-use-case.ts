import { PrismaOrderTypeRepository } from "@/repositories/prisma/order-type";
import { ListOrderTypeUseCase } from "@/services/service-order-type/list";


export function makeListOptionsOrderTypeUseCase() {
  const orderTypeRepository = new PrismaOrderTypeRepository();
  const useCase = new ListOrderTypeUseCase(orderTypeRepository);

  return useCase
}