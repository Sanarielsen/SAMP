import { PrismaClientRepository } from '@/repositories/prisma/client'
import { CreateClientUseCase } from '@/services/use-cases/client/post'
import { PrismaUserRepository } from '@/repositories/prisma/user'


export function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateClientUseCase(clientRepository, userRepository)

  return useCase
}