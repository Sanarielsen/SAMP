import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository"
import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { UpdateImportedProcessUseCase } from "@/services/use-cases/imported-process/update"


export function makeUpdateImportedProcess() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()
  const clientRepository=  new PrismaClientRepository()
  const importedProcessRepository = new PrismaImportedProcessRepository()

  return new UpdateImportedProcessUseCase(
    userRoleRepository,
    userRepository,
    clientRepository,
    importedProcessRepository
  )
}