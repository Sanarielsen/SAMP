import { PrismaPublicationRepository } from '@/repositories/prisma/prisma-publication-repository'
import { PrismaProcessImportedRepository } from '@/repositories/prisma/prisma-process-imported-repository'
import { PrismaProcessHistoricRepository } from '@/repositories/prisma/prisma-process-historic-repository'
import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PostPublicationTransferImportedProcessUseCase } from '@/services/service-publication/post-transfer-imported-process'


export function makePostPublicationTransferImportedProcess() {
  const publicationRepository = new PrismaPublicationRepository()
  const importedProcessRepository = new PrismaProcessImportedRepository()
  const processHistoricRepository = new PrismaProcessHistoricRepository();
  const clientRepository = new PrismaClientRepository();

  const useCase = new PostPublicationTransferImportedProcessUseCase(
    publicationRepository, 
    importedProcessRepository,
    processHistoricRepository,
    clientRepository,
  )

  return useCase
}