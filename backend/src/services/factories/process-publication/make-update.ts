import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { UpdateProcessPublicationUseCase } from "@/services/use-cases/process-publication/update";


export function makeUpdateProcessPublication() {
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