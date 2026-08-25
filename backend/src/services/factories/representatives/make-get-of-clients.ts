import { PrismaRepresentativeRepository } from '@/repositories/prisma/representative'
import { GetRepresentativeOfClientsUseCase } from '@/services/use-cases/representative/get-of-clients'


export function makeGetRepresentativeOfClientsUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new GetRepresentativeOfClientsUseCase(representativeRepository)

  return useCase
}