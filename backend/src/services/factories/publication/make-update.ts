import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository"
import { PrismaProcessTypeRepository } from "@/repositories/prisma/prisma-process-type-repository"
import { PrismaPublicationRepository } from "@/repositories/prisma/prisma-publication-repository"
import { UpdatePublicationUseCase } from "@/services/service-publication/update"


export function makeUpdatePublicationUseCase() {
  const clientRepository = new PrismaClientRepository()
  const processTypeRepository = new PrismaProcessTypeRepository()
  const publicationRepository = new PrismaPublicationRepository()

  const useCase = new UpdatePublicationUseCase(
    clientRepository,
    processTypeRepository,
    publicationRepository
  )

  return useCase
}