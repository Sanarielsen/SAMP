import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { CreateClientUseCase } from '@/services/service-client/post'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateClientUseCase(clientRepository, userRepository)

  return useCase
}