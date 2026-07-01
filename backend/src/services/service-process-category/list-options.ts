import { ProcessCategoryRepository } from '@/repositories/process-category-repository';

import { OptionsControlledBox } from '@shared/types/values'


export class ListProcessCategoryAsAOptionsUseCase {
  constructor(
    private processCategoryRepository: ProcessCategoryRepository
  ) {}

  async execute(): Promise<OptionsControlledBox[] | null> {

    return await this.processCategoryRepository.findManyOptionCategories();
  }
}