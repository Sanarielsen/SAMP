import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { PrismaUserRepository } from "@/repositories/prisma/user"
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { PostManyProcessPublicationUseCase } from "@/services/use-cases/process-publication/post-many";


export function makePostManyProcessPublicationsUseCase() {
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