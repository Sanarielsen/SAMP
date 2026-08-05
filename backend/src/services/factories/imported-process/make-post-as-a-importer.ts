import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessHistoryRepository } from '@/repositories/prisma/prisma-process-history-repository'
import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { LocalStorageProvider } from '@/storage/local-storage-provider'
import { CreateProcessAsImportUseCase } from '@/services/service-imported-process/post-import'


export function makeImportProcessUseCase() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processHistoricRepository = new PrismaProcessHistoryRepository();
  const processCategoryRepository = new PrismaProcessCategoryRepository();
  const storageProvider = new LocalStorageProvider();
  const useCase = new CreateProcessAsImportUseCase(
    importedProcessRepository, 
    processHistoricRepository,
    processCategoryRepository,
    storageProvider,
  )

  return useCase
}