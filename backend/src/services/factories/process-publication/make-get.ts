import { PrismaProcessPublicationRepository } from "@/repositories/prisma/process-publication"
import { GetProcessPublicationUseCase } from "@/services/use-cases/process-publication/get"


export function makeGetProcessPublicationUseCase() {
  const processPublication = new PrismaProcessPublicationRepository()
  return new GetProcessPublicationUseCase(processPublication)
}