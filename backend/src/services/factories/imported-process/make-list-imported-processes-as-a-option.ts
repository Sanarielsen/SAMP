import { PrismaImportedProcessRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessHistoryRepository } from '@/repositories/prisma/prisma-process-history-repository'
import { ListImportedProcessesAsAOptionUseCase } from '@/services/service-imported-process/list-imported-processes-as-a-option'


export function makeListImportProcessesAsAOption() {
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const processHistoricRepository = new PrismaProcessHistoryRepository()
  const useCase = new ListImportedProcessesAsAOptionUseCase(
    importedProcessRepository,
    processHistoricRepository,
  )

  return useCase
}