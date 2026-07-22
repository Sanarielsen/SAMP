import { 
  InMemoryProcessHistoryRepository 
} from '@/repositories/in-memory/in-memory-process-history'

import { ProcessHistory } from '@shared/types/processHistory'


export async function makeProcessHistory(
  repository: InMemoryProcessHistoryRepository,
  override: Partial<ProcessHistory> = {},
) {

  return repository.create({
    categoryId: 'category-test',
    fileName: 'file-name-test',
    filePath: 'file-path-test',
    numberMagazine: '1234',

    ...override,
  })
}