import { PrismaRepresentativeRepository } from '@/repositories/prisma/representative'
import { GetRepresentativeUseCase } from '@/services/use-cases/representative/get'


export function makeGetRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new GetRepresentativeUseCase(representativeRepository)

  return useCase
}