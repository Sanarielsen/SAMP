import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { UpdateClientUseCase } from '../update-client'

export function makeUpdateClientUseCase() {
  const clientRepository = new PrismaClientRepository()
  const GetProfileUseCase = new UpdateClientUseCase(clientRepository)

  return GetProfileUseCase
}