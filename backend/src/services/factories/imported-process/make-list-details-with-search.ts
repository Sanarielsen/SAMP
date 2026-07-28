import { PrismaUserRoleRepository } from '@/repositories/prisma/prisma-user-role-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { PrismaImportedProcessRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { ListImportedProcessSearchWithDetailsUseCase } from '@/services/service-imported-process/list-search-with-details'


export function makeListImportProcessesDetailsWithSearch() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const useCase = new ListImportedProcessSearchWithDetailsUseCase(
    userRoleRepository,
    userRepository,
    importedProcessRepository,
  )

  return useCase
}