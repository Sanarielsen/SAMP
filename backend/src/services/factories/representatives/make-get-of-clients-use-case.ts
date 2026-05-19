import { PrismaRepresentativeRepository } from '@/repositories/prisma/prisma-representative-repository'
import { DeleteRepresentativeUseCase } from '@/services/service-representative/delete'
import { GetRepresentativeOfClientsUseCase } from '@/services/service-representative/get-of-clients'

export function makeGetRepresentativeOfClientsUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository()
  const useCase = new GetRepresentativeOfClientsUseCase(representativeRepository)

  return useCase
}