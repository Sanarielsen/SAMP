import { 
  InMemoryPublicationRepository 
} from '@/repositories/in-memory/in-memory-publication'

import { Publication } from '@shared/types/publication'


export async function makePublication(
  repository: InMemoryPublicationRepository,
  override: Partial<Publication> = {},
) {

  return repository.create({
    processTypeId: 'process-type-id',
    clientId: 'client-id',
    processNumber: '123456789',
    holder: 'Titular test',
    brand: 'Marca test',
    nature: 'Natureza test',
    specification: 'Specification Test',
    publicationDate: new Date(Date.now()),
    depositDate: new Date(Date.now()),
    grantDate: new Date(Date.now()),
    createdAt: new Date(Date.now()),

    ...override,
  })
}