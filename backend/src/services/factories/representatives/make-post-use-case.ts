import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PrismaRepresentativeRepository } from '@/repositories/prisma/prisma-representative-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PostRepresentativeUseCase } from '@/services/service-representative/post'

export function makePostRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const clientRepository = new PrismaClientRepository()
  const useCase = new PostRepresentativeUseCase(representativeRepository, clientRepository)

  return useCase
}