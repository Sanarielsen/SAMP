import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { ListProcessPublicationsUseCase } from "@/services/service-process-publication/list"


export function makeListProcessPublication() {
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const processPublicationRepository = new PrismaProcessPublicationRepository()

  return new ListProcessPublicationsUseCase(
    importedProcessRepository,
    processPublicationRepository
  )
}