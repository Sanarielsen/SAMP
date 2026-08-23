import { PrismaUserRoleRepository } from '@/repositories/prisma/user-role'
import { PrismaUserRepository } from '@/repositories/prisma/user'
import { PrismaImportedProcessRepository } from '@/repositories/prisma/imported-process'
import { ListImportedProcessSearchWithDetailsUseCase } from '@/services/use-cases/imported-process/list-search-with-details'


export function makeListImportProcessesDetailsWithSearchUseCase() {
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