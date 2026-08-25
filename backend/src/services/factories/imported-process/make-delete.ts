import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { DeleteImportedProcessUseCase } from "@/services/use-cases/imported-process/delete";


export function makeDeleteImportedProcessUseCase() {
  const importedProcessRepository = new PrismaImportedProcessRepository();
  return new DeleteImportedProcessUseCase(
    importedProcessRepository
  )
}