import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-historic-repository'
import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-process-imported-repository'
import { CreateProcessAsImportUseCase } from '@/services/service-process-imported/post-import'
import { LocalStorageProvider } from '@/storage/local-storage-provider'


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