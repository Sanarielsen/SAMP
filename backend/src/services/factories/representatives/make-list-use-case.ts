import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PrismaRepresentativeRepository } from '@/repositories/prisma/prisma-representative-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListClientUseCase } from '@/services/service-client/list'
import { ListRepresentativeUseCase } from '@/services/service-representative/list'

export function makeListRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  
  const useCase = new ListRepresentativeUseCase(representativeRepository)

  return useCase
}