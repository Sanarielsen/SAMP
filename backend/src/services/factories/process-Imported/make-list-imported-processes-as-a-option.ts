import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-historic-repository'
import { ListImportedProcessesAsAOptionUseCase } from '@/services/service-process-imported/list-imported-processes-as-a-option'


export function makeListImportProcessesAsAOption() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processHistoricRepository = new PrismaProcessHistoricRepository()
  const useCase = new ListImportedProcessesAsAOptionUseCase(
    importedProcessRepository,
    processHistoricRepository,
  )

  return useCase
}