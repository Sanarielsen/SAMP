import { PrismaRepresentativeRepository } from '@/repositories/prisma/prisma-representative-repository'
import { UpdateRepresentativeUseCase } from '@/services/use-cases/representative/update'


export function makeUpdateRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new UpdateRepresentativeUseCase(representativeRepository)

  return useCase
}