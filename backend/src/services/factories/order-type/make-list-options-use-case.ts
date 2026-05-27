import { PrismaOrderTypeRepository } from "@/repositories/prisma/prisma-order-type-repository";
import { ListOrderTypeUseCase } from "@/services/service-order-types/list";

export function makeListOptionsOrderTypeUseCase() {
  const orderTypeRepository = new PrismaOrderTypeRepository();
  const useCase = new ListOrderTypeUseCase(orderTypeRepository);

  return useCase
}