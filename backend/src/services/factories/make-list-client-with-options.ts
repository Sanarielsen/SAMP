import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { ListClientWithOptionsUseCase } from '@/services/service-client/list-with-options'

export function makeListClientWithOptionsUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListClientWithOptionsUseCase(clientRepository)

  return useCase
}