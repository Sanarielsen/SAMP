import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { PostManyProcessPublicationUseCase } from "@/services/use-cases/process-publication/post-many";


export function makePostManyProcessPublications() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  const importedProcessRepository = new PrismaImportedProcessRepository();
  const processPublicationRepository = new PrismaProcessPublicationRepository();

  return new PostManyProcessPublicationUseCase(
    userRoleRepository, 
    userRepository,
    importedProcessRepository,
    processPublicationRepository
  )
}