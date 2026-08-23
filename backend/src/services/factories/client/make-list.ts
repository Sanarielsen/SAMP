import { PrismaClientRepository } from '@/repositories/prisma/client'
import { ListClientUseCase } from '@/services/use-cases/client/list'


export function makeListClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListClientUseCase(clientRepository)

  return useCase
}