import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository"
import { PrismaProcessTypeRepository } from "@/repositories/prisma/prisma-process-type-repository"
import { PrismaPublicationRepository } from "@/repositories/prisma/prisma-publication-repository"
import { PostPublicationUseCase } from "@/services/service-publication/post"


export function makePostPublicationUseCase() {
  const clientRepository = new PrismaClientRepository()
  const processTypeRepository = new PrismaProcessTypeRepository()
  const publicationRepository = new PrismaPublicationRepository()
  const useCase = new PostPublicationUseCase(
    clientRepository,
    processTypeRepository,
    publicationRepository
  )

  return useCase
}