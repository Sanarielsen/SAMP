import { PrismaImportedProcessRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { PrismaProcessTypeRepository } from '@/repositories/prisma/prisma-process-type-repository'
import { PrismaProcessHistoryRepository } from '@/repositories/prisma/prisma-process-history-repository'
import { PostQueryImportedProcessDetailsUseCase } from '@/services/service-imported-process/post-query-with-details'


export function makePostQueryImportProcessesWithDetails() {
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const processCategoryRepository = new PrismaProcessCategoryRepository
  const processTypeRepository = new PrismaProcessTypeRepository();
  const processHistoricRepository = new PrismaProcessHistoryRepository()
  const useCase = new PostQueryImportedProcessDetailsUseCase(
    importedProcessRepository,
    processCategoryRepository,
    processTypeRepository,
    processHistoricRepository
  )

  return useCase
}