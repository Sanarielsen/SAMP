import { PrismaProcessHistoricRepository } from "@/repositories/prisma/prisma-process-historic-repository";
import { GetProcessHistoryDetailsUseCase } from "@/services/service-process-historic/get-details";


export function makeGetProcessHistoryDetailUseCase() {
  const processHistoryRepository = new PrismaProcessHistoricRepository();
  const useCase = new GetProcessHistoryDetailsUseCase(processHistoryRepository);
  
  return useCase
}