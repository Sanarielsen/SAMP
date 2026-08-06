import { PrismaImportedProcessRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { GetProcessImportedWithDetailsUseCase } from '@/services/service-imported-process/get-imported-process-with-details'


export function makeGetProcessImportedWithDetails() {
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const useCase = new GetProcessImportedWithDetailsUseCase(
    importedProcessRepository
  )

  return useCase
}