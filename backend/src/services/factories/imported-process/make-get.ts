import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process";
import { GetImportedProcessUseCase } from "@/services/use-cases/imported-process/get";


export function makeGetImportedProcessUseCase() {
  return new GetImportedProcessUseCase(
    new PrismaImportedProcessRepository()
  )
}