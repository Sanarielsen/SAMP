import { PrismaProcessHistoricRepository } from "@/repositories/prisma/prisma-process-history-repository";
import { ListProcessHistoricAsAOptionsUseCase } from "@/services/service-process-history/list-as-a-option";


export function makeListProcessHistoricAsAOptionsUseCase() {
  const processHistoricRepository = new PrismaProcessHistoricRepository();
  const useCase = new ListProcessHistoricAsAOptionsUseCase(processHistoricRepository);

  return useCase
}