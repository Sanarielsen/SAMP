import { PrismaProcessPublicationRepository } from "@/repositories/prisma/prisma-process-publication-repository"
import { GetProcessPublicationUseCase } from "@/services/service-process-publication/get"


export function makeGetProcessPublication() {
  const processPublication = new PrismaProcessPublicationRepository()
  return new GetProcessPublicationUseCase(processPublication)
}