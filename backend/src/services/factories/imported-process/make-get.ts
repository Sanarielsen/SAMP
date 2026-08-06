import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository";
import { GetImportedProcessUseCase } from "@/services/service-imported-process/get";

export function makeGetImportedProcess() {
  return new GetImportedProcessUseCase(
    new PrismaImportedProcessRepository()
  )
}