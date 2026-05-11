import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { CreateClientUseCase } from '../post-client'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const userRepository = new PrismaUsersRepository()
  const useCase = new CreateClientUseCase(clientRepository, userRepository)

  return useCase
}