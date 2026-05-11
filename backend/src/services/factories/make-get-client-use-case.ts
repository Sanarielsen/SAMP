import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { GetClientUseCase } from '@/services/get-client'

export function makeGetClientProfileUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new GetClientUseCase(clientRepository)

  return useCase
}