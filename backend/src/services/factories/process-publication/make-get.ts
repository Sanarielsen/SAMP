import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { GetProcessPublicationUseCase } from "@/services/use-cases/process-publication/get"


export function makeGetProcessPublication() {
  const processPublication = new PrismaProcessPublicationRepository()
  return new GetProcessPublicationUseCase(processPublication)
}