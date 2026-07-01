import { ListPublicationUseCase } from '@/services/service-publication/list'

import { PrismaPublicationRepository } from '@/repositories/prisma/prisma-publication-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'


export function makeListPublicationUseCase() {
  const publicationRepository = new PrismaPublicationRepository();
  const userRepository = new PrismaUserRepository();
  
  const useCase = new ListPublicationUseCase(
    publicationRepository,
    userRepository,
  )

  return useCase
}