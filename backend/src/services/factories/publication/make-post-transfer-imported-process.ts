import { PrismaPublicationRepository } from '@/repositories/prisma/prisma-publication-repository'
import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-imported-process-repository'
import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PostPublicationTransferImportedProcessUseCase } from '@/services/service-publication/post-transfer-imported-process'


export function makePostPublicationTransferImportedProcess() {
  const publicationRepository = new PrismaPublicationRepository()
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const clientRepository = new PrismaClientRepository();

  const useCase = new PostPublicationTransferImportedProcessUseCase(
    publicationRepository, 
    importedProcessRepository,
    clientRepository,
  )

  return useCase
}