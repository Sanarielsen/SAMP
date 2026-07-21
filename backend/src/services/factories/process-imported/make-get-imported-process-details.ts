import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { GetProcessImportedWithDetailsUseCase } from '@/services/service-process-imported/get-imported-process-with-details'


export function makeGetProcessImportedWithDetails() {
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const useCase = new GetProcessImportedWithDetailsUseCase(
    importedProcessRepository
  )

  return useCase
}