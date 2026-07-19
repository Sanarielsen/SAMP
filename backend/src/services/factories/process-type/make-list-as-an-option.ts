import { PrismaProcessTypeRepository } from "@/repositories/prisma/prisma-process-type-repository";
import { ListProcessTypeAsAnOptionUseCase } from "@/services/service-process-type/list-as-an-option";


export function makeListProcessTypeAsAnOptionUseCase() {
  const processTypeRepository = new PrismaProcessTypeRepository();
  const useCase = new ListProcessTypeAsAnOptionUseCase(processTypeRepository);

  return useCase
}