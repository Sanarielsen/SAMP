import { PrismaProcessHistoricRepository } from "@/repositories/prisma/prisma-process-historic-repository";
import { ListProcessHistoricAsAOptionsUseCase } from "@/services/service-process-historic/list-as-a-option";


export function makeListProcessHistoricAsAOptionsUseCase() {
  const processHistoricRepository = new PrismaProcessHistoricRepository();
  const useCase = new ListProcessHistoricAsAOptionsUseCase(processHistoricRepository);

  return useCase
}