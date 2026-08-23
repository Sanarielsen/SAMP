import { PrismaClientRepository } from '@/repositories/prisma/client'
import { UpdateClientStatusUseCase } from '@/services/use-cases/client/change-status'


export function makeChangeStatusClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new UpdateClientStatusUseCase(clientRepository)

  return useCase
}
