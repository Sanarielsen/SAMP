import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { DeleteProcessPublicationUseCase } from "@/services/use-cases/process-publication/delete"


export function makeDeleteProcessPublication() {
  const processPublicationRepository = new PrismaProcessPublicationRepository()

  return new DeleteProcessPublicationUseCase(
    processPublicationRepository
  )
}