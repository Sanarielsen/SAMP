import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { ListProcessPublicationsUseCase } from "@/services/use-cases/process-publication/list"


export function makeListProcessPublicationUseCase() {
  const importedProcessRepository = new PrismaImportedProcessRepository()
  const processPublicationRepository = new PrismaProcessPublicationRepository()

  return new ListProcessPublicationsUseCase(
    importedProcessRepository,
    processPublicationRepository
  )
}