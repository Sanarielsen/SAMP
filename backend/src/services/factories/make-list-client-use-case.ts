import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { ListClientUseCase } from '@/services/list-clients'

export function makeListClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListClientUseCase(clientRepository)

  return useCase
}