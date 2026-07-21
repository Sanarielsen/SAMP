import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListProcessHistoryWithDetailsUseCase } from "@/services/service-process-history/list-with-details";
import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { InMemoryProcessHistoryRepository } from "@/repositories/in-memory/in-memory-process-history";
import { makeProcessCategory } from "@/services/factories/process-category/make-entity";
import { makeProcessHistory } from "@/services/factories/process-history/make-entity";


let processHistoryRepository: InMemoryProcessHistoryRepository
let processCategoryRepository: InMemoryProcessCategoryRepository
let sut: ListProcessHistoryWithDetailsUseCase

describe('List Process Historic With Details', () => {
  beforeEach(() => {
    processCategoryRepository = new InMemoryProcessCategoryRepository();
    processHistoryRepository = new InMemoryProcessHistoryRepository(processCategoryRepository);

    sut = new ListProcessHistoryWithDetailsUseCase(
      processHistoryRepository
    )
  })

  it('should query all the magazines imported before', async () => {
    const category = await makeProcessCategory(processCategoryRepository);

    makeProcessHistory(processHistoryRepository, {
      categoryId: category.id
    });

    makeProcessHistory(processHistoryRepository, {
      categoryId: category.id
    });

    makeProcessHistory(processHistoryRepository, {
      categoryId: category.id
    });

    const result = await sut.execute()

    expect(result).toHaveLength(3)
  })
})