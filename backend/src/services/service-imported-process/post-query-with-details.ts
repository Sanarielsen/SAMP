import { ImportedProcessRepository } from "@/repositories/imported-process-repository";
import { ProcessCategoryRepository } from "@/repositories/process-category-repository";
import { ProcessTypeRepository } from "@/repositories/process-type-repository";
import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  ImportedProcess,
  ImportedProcessFilter
} from "@shared/types/importedProcess";


export class PostQueryImportedProcessDetailsUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processCategoryRepository: ProcessCategoryRepository,
    private processTypeRepository: ProcessTypeRepository,
    private processHistoryRepository: ProcessHistoryRepository,
  ) {}

  async execute(
    search: string, 
    filter: ImportedProcessFilter
  ): Promise<ImportedProcess[] | null> {
    
    const category = await this.processCategoryRepository.findById(filter.categoryId)

    if (!category) {
      throw new ResourceNotFoundError();
    }

    if (filter.typeId) {
      const type = await this.processTypeRepository.findById(filter.typeId)

      if (!type) {
        throw new ResourceNotFoundError();
      }
    }

    if (filter.historyId) {
      const history = await this.processHistoryRepository.findById(filter.historyId)

      if (!history) {
        throw new ResourceNotFoundError();
      }
    }

    return await this.importedProcessRepository.findManyByFilterWithSearch(
      search,
      filter
    )
  }
}