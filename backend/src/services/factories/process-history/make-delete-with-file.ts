import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { PrismaProcessHistoryRepository } from "@/repositories/prisma/prisma-process-history-repository"
import { LocalStorageProvider } from "@/storage/local-storage-provider";

import { DeleteProcessHistoryWithFileUseCase } from "@/services/service-process-history/delete-with-file";


export function makeDeleteProcessHistoryWithFileUseCase() {
  const importedProcessRepository = new PrismaImportedProcessRepository();
  const processHistoryRepository = new PrismaProcessHistoryRepository();
  const storageProvider = new LocalStorageProvider()

  const useCase = new DeleteProcessHistoryWithFileUseCase(
    importedProcessRepository,
    processHistoryRepository,
    storageProvider
  )

  return useCase
}