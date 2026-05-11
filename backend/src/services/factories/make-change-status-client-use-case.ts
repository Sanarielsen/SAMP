import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { CreateClientUseCase } from '../post-client'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateClientStatusUseCase } from '../change-status-client'

export function makeChangeStatusClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const useCase = new UpdateClientStatusUseCase(clientRepository)

  return useCase
}
