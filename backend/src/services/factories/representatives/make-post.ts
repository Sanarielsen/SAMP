import { PrismaClientRepository } from '@/repositories/prisma/client'
import { PrismaRepresentativeRepository } from '@/repositories/prisma/representative'
import { PostRepresentativeUseCase } from '@/services/use-cases/representative/post'


export function makePostRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const clientRepository = new PrismaClientRepository()
  const useCase = new PostRepresentativeUseCase(representativeRepository, clientRepository)

  return useCase
}