import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { PrismaUserRepository } from "@/repositories/prisma/user"
import { PrismaClientRepository } from "@/repositories/prisma/client"
import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { UpdateImportedProcessUseCase } from "@/services/use-cases/imported-process/update"


export function makeUpdateImportedProcessUseCase() {
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