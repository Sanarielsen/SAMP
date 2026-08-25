import { PrismaRepresentativeRepository } from '@/repositories/prisma/representative'
import { DeleteRepresentativeUseCase } from '@/services/use-cases/representative/delete'


export function makeDeleteRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new DeleteRepresentativeUseCase(representativeRepository)

  return useCase
}