import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { PrismaUserRepository } from "@/repositories/prisma/user"
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { DeleteProcessPublicationUseCase } from "@/services/use-cases/process-publication/delete"


export function makeDeleteProcessPublicationUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository()
  const userRepository = new PrismaUserRepository()
  const processPublicationRepository = new PrismaProcessPublicationRepository()

  return new DeleteProcessPublicationUseCase(
    userRepository,
    userRoleRepository,
    processPublicationRepository
  )
}