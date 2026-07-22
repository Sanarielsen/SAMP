import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";
import { ImportedProcessRepository } from "@/repositories/process-imported-repository";
import { StorageProvider } from "@/storage/storage-provider";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeleteProcessHistoryWithFileUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processHistoryRepository: ProcessHistoryRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const history = await this.processHistoryRepository.findById(id)

    if (!history) {
      throw new ResourceNotFoundError()
    }

    await this.importedProcessRepository.deleteManyByProcessHistoricId(history.id)

    if (history.filePath) {
      console.log(history.filePath)
      try {
        await this.storageProvider.delete(history.filePath)
      } catch (err) {
        console.log('Failed to delete file from storage:', err)
      }
    }

    await this.processHistoryRepository.delete(id)
  }
}