import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository";
import { GetImportedProcessUseCase } from "@/services/use-cases/imported-process/get";


export function makeGetImportedProcess() {
  return new GetImportedProcessUseCase(
    new PrismaImportedProcessRepository()
  )
}