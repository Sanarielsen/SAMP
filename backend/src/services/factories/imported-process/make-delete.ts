import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { DeleteImportedProcessUseCase } from "@/services/service-imported-process/delete";


export function makeDeleteImportedProcess() {
  const importedProcessRepository = new PrismaImportedProcessRepository();
  return new DeleteImportedProcessUseCase(
    importedProcessRepository
  )
}