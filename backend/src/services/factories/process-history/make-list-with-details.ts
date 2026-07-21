import { PrismaProcessHistoricRepository } from "@/repositories/prisma/prisma-process-history-repository";
import { ListProcessHistoryWithDetailsUseCase } from "@/services/service-process-history/list-with-details";


export function makeListProcessHistoryWithDetails() {
  const processHistoryRepository = new PrismaProcessHistoricRepository();
  const useCase = new ListProcessHistoryWithDetailsUseCase(processHistoryRepository);
  
  return useCase
}