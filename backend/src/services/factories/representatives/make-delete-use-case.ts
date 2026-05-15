import { PrismaRepresentativeRepository } from '@/repositories/prisma/prisma-representative-repository'
import { DeleteRepresentativeUseCase } from '@/services/service-representative/delete'

export function makeDeleteRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new DeleteRepresentativeUseCase(representativeRepository)

  return useCase
}