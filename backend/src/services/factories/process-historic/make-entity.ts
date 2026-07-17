import { 
  InMemoryProcessHistoryRepository 
} from '@/repositories/in-memory/in-memory-process-history'

import { ProcessHistoric } from '@shared/types/processHistoric'


export async function makeProcessHistory(
  repository: InMemoryProcessHistoryRepository,
  override: Partial<ProcessHistoric> = {},
) {

  return repository.create({
    categoryId: 'category-test',
    fileName: 'file-name-test',
    filePath: 'file-path-test',
    numberMagazine: '1234',

    ...override,
  })
}