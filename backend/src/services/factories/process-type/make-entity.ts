import { 
  InMemoryProcessTypeRepository
} from '@/repositories/in-memory/in-memory-process-type'

import { ProcessType } from '@shared/types/processType'


export async function makeProcessType(
  repository: InMemoryProcessTypeRepository,
  override: Partial<ProcessType> = {},
) {

  return repository.create({
    name: 'name-test',
    description: 'description-test',
    slug: 'process-type-test',

    ...override,
  })
}