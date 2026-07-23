import { PrismaPublicationRepository } from "@/repositories/prisma/prisma-publication-repository"
import { DeletePublicationUseCase } from "@/services/service-publication/delete";


export function makeDeletePublicationUseCase() {
  const publicationRepository = new PrismaPublicationRepository();

  return new DeletePublicationUseCase(publicationRepository)
}