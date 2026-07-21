import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessCategoryRepository } from '@/repositories/prisma/prisma-process-category-repository'
import { PrismaProcessTypeRepository } from '@/repositories/prisma/prisma-process-type-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-history-repository'
import { PostQueryImportedProcessDetailsUseCase } from '@/services/service-process-imported/post-query-with-details'


export function makePostQueryImportProcessesWithDetails() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processCategoryRepository = new PrismaProcessCategoryRepository
  const processTypeRepository = new PrismaProcessTypeRepository();
  const processHistoricRepository = new PrismaProcessHistoricRepository()
  const useCase = new PostQueryImportedProcessDetailsUseCase(
    importedProcessRepository,
    processCategoryRepository,
    processTypeRepository,
    processHistoricRepository
  )

  return useCase
}