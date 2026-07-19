import { PrismaProcessHistoryRepository } from "@/repositories/prisma/prisma-process-history-repository";
import { GetProcessHistoryDetailsUseCase } from "@/services/service-process-history/get-details";


export function makeGetProcessHistoryDetailUseCase() {
  const processHistoryRepository = new PrismaProcessHistoryRepository();
  const useCase = new GetProcessHistoryDetailsUseCase(processHistoryRepository);
  
  return useCase
}