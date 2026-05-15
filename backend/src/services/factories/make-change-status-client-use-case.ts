import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { UpdateClientStatusUseCase } from '@/services/service-client/change-status'

export function makeChangeStatusClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new UpdateClientStatusUseCase(clientRepository)

  return useCase
}
