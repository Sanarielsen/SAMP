import { PrismaPublicationRepository } from '@/repositories/prisma/prisma-publication-repository'
import { GetPublicationUseCase } from '@/services/service-publication/get';


export function makeGetPublicationUseCase() {
  const publicationRepository = new PrismaPublicationRepository();
  
  return new GetPublicationUseCase(publicationRepository);
}