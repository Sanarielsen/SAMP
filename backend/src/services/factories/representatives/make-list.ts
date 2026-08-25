import { PrismaRepresentativeRepository } from '@/repositories/prisma/representative'
import { ListRepresentativeUseCase } from '@/services/use-cases/representative/list'


export function makeListRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  
  const useCase = new ListRepresentativeUseCase(representativeRepository)

  return useCase
}