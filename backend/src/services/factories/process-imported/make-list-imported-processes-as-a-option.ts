import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessHistoryRepository } from '@/repositories/prisma/prisma-process-history-repository'
import { ListImportedProcessesAsAOptionUseCase } from '@/services/service-process-imported/list-imported-processes-as-a-option'


export function makeListImportProcessesAsAOption() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processHistoricRepository = new PrismaProcessHistoryRepository()
  const useCase = new ListImportedProcessesAsAOptionUseCase(
    importedProcessRepository,
    processHistoricRepository,
  )

  return useCase
}