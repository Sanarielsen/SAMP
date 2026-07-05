import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-historic-repository'
import { PrismaProcessRepository } from '@/repositories/prisma/prisma-process-repository'
import { CreateProcessAsImportUseCase } from '@/services/service-process/post-import'
import { LocalStorageProvider } from '@/storage/local-storage-provider'

export function makeImportProcessUseCase() {
  const processRepository = new PrismaProcessRepository()
  const processHistoricRepository = new PrismaProcessHistoricRepository();
  const processCategoryRepository = new PrismaProcessCategoryRepository();
  const storageProvider = new LocalStorageProvider();
  const useCase = new CreateProcessAsImportUseCase(
    processRepository, 
    processHistoricRepository,
    processCategoryRepository,
    storageProvider,
  )

  return useCase
}