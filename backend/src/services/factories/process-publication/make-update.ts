import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { PrismaUserRepository } from "@/repositories/prisma/user"
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { UpdateProcessPublicationUseCase } from "@/services/use-cases/process-publication/update";


export function makeUpdateProcessPublicationUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  const importedProcessRepository = new PrismaImportedProcessRepository();
  const processPublicationRepository = new PrismaProcessPublicationRepository();

  return new UpdateProcessPublicationUseCase(
    userRoleRepository, 
    userRepository,
    importedProcessRepository,
    processPublicationRepository
  )
}