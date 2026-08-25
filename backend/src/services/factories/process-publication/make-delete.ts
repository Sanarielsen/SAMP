import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { DeleteProcessPublicationUseCase } from "@/services/use-cases/process-publication/delete"


export function makeDeleteProcessPublicationUseCase() {
  const processPublicationRepository = new PrismaProcessPublicationRepository()

  return new DeleteProcessPublicationUseCase(
    processPublicationRepository
  )
}