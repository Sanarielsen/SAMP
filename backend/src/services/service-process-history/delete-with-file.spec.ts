import { 
  beforeEach,
  describe,
  expect,
  it,
  vi,
  afterEach
} from "vitest";

import { DeleteProcessHistoryWithFileUseCase } from "@/services/service-process-history/delete-with-file";
import { InMemoryProcessHistoryRepository } from "@/repositories/in-memory/in-memory-process-history";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeProcessHistory } from "@/services/factories/process-history/make-entity";


let processCategoryRepository: InMemoryProcessCategoryRepository
let processHistoryRepository: InMemoryProcessHistoryRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let storageProvider: { delete: ReturnType<typeof vi.fn> }
let sut: DeleteProcessHistoryWithFileUseCase

describe('Delete Process History With File Use Case', () => {
  beforeEach(async () => {
    processCategoryRepository = new InMemoryProcessCategoryRepository();
    processHistoryRepository = new InMemoryProcessHistoryRepository(processCategoryRepository);
    importedProcessRepository = new InMemoryImportedProcessRepository();
    storageProvider = {
      delete: vi.fn(),
    }

    sut = new DeleteProcessHistoryWithFileUseCase(
      importedProcessRepository,
      processHistoryRepository,
      storageProvider as any
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to delete a process history with file', async () => {
    const processHistory = await makeProcessHistory(processHistoryRepository, {
      filePath: '/storage/file.pdf'
    })

    await sut.execute(processHistory.id)

    expect(processHistoryRepository.items).toHaveLength(0)
    expect(storageProvider.delete).toHaveBeenCalledWith(processHistory.filePath)
  })

  it('should be able to delete a process history without file', async () => {
    const processHistory = await makeProcessHistory(processHistoryRepository, {
      filePath: undefined
    })

    await sut.execute(processHistory.id)

    expect(processHistoryRepository.items).toHaveLength(0)
    expect(storageProvider.delete).not.toHaveBeenCalled()
  })

  it('should not be able to delete a non-existing process history', async () => {
    await expect(() => 
      sut.execute('non-existing-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should delete process history even if file deletion fails', async () => {
    const processHistory = await makeProcessHistory(processHistoryRepository, {
      filePath: '/storage/file.pdf'
    })

    storageProvider.delete.mockRejectedValue(new Error('Storage error'))

    await sut.execute(processHistory.id)

    expect(processHistoryRepository.items).toHaveLength(0)
    expect(storageProvider.delete).toHaveBeenCalledWith(processHistory.filePath)
  })

  it('should delete imported processes before deleting the history', async () => {
    const processHistory = await makeProcessHistory(processHistoryRepository)

    await importedProcessRepository.create({
      id: 'imported-1',
      processHistoricId: processHistory.id,
    } as any)

    await importedProcessRepository.create({
      id: 'imported-2',
      processHistoricId: processHistory.id,
    } as any)

    await sut.execute(processHistory.id)

    expect(importedProcessRepository.items).toHaveLength(0)
    expect(processHistoryRepository.items).toHaveLength(0)
  })
})