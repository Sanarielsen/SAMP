import { PrismaClientRepository } from '@/repositories/prisma/client'
import { ListClientWithOptionsUseCase } from '@/services/use-cases/client/list-with-options'


export function makeListClientWithOptionsUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListClientWithOptionsUseCase(clientRepository)

  return useCase
}