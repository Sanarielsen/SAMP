import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-historic-repository'
import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { LocalStorageProvider } from '@/storage/local-storage-provider'
import { CreateProcessAsImportUseCase } from '@/services/service-process-imported/post-import'


export function makeImportProcessUseCase() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processHistoricRepository = new PrismaProcessHistoricRepository();
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