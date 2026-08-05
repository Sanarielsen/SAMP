import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { PostQueryImportedProcessDetailsUseCase } from "@/services/service-imported-process/post-query-with-details";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { InMemoryProcessHistoryRepository } from "@/repositories/in-memory/in-memory-process-history";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { makeProcessCategory } from "@/services/factories/process-category/make-entity";
import { makeProcessType } from "@/services/factories/process-type/make-entity";
import { makeProcessHistory } from "@/services/factories/process-history/make-entity";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { ProcessCategory } from "@shared/types/processCategory";
import { ProcessHistory } from "@shared/types/processHistory";
import { ProcessType } from "@shared/types/processType";


let importedProcessRepository: InMemoryImportedProcessRepository
let processCategoryRepository: InMemoryProcessCategoryRepository
let processTypeRepository: InMemoryProcessTypeRepository
let processHistoryRepository: InMemoryProcessHistoryRepository
let sut: PostQueryImportedProcessDetailsUseCase

let newCategory: ProcessCategory
let newType: ProcessType
let newHistory: ProcessHistory

describe('List Imported Process Use Case', () => {
  beforeEach( async () => {
    importedProcessRepository = new InMemoryImportedProcessRepository();
    processCategoryRepository = new InMemoryProcessCategoryRepository();
    processTypeRepository = new InMemoryProcessTypeRepository();
    processHistoryRepository = new InMemoryProcessHistoryRepository();

    sut = new PostQueryImportedProcessDetailsUseCase(
      importedProcessRepository,
      processCategoryRepository,
      processTypeRepository,
      processHistoryRepository
    );

    newCategory = await makeProcessCategory(processCategoryRepository)
    newType = await makeProcessType(processTypeRepository)
    newHistory = await makeProcessHistory(processHistoryRepository)
  })

  it('should list imported process', async () => {

    makeImportedProcess(importedProcessRepository, {
      processCategoryId: newCategory.id,
      processTypeId: newType.id,
      processHistoricId: newHistory.id,
      processNumber: '1231'
    })

    makeImportedProcess(importedProcessRepository, {
      processCategoryId: newCategory.id,
      processTypeId: newType.id,
      processHistoricId: newHistory.id,
      processNumber: '1232'
    })

    makeImportedProcess(importedProcessRepository, {
      processCategoryId: newCategory.id,
      processTypeId: newType.id,
      processHistoricId: newHistory.id,
      processNumber: '1233'
    })

    makeImportedProcess(importedProcessRepository, {
      processCategoryId: newCategory.id,
      processTypeId: newType.id,
      processHistoricId: newHistory.id,
      processNumber: '1234'
    })

    const importedProcesses = await sut.execute('', {
      categoryId: newCategory.id,
      historyId: newHistory.id,
      typeId: newType.id,
    })

    expect(importedProcesses).toHaveLength(4)
  })

  it('should not return processes with a non-existent process category', async () => {
    await expect(() => sut.execute(
      '', {
        categoryId: 'category-non-exist',
        historyId: newHistory.id,
        typeId: newType.id,
      }
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not return processes for a non-existent imported magazine', async () => {
    await expect(() => sut.execute(
      '', {
        categoryId: newCategory.id,
        historyId: 'historic-non-exist',
        typeId: newType.id,
      }
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not return processes with a non-existent process type', async () => {
    await expect(() => sut.execute(
      '', {
        categoryId: newCategory.id,
        historyId: newHistory.id,
        typeId: 'type-non-exist',
      }
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) 