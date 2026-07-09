import { ProcessCategoryRepository } from '@/repositories/process-category-repository';
import { ProcessHistoricRepository } from '@/repositories/process-historic-repository';

import { OptionsControlledBox } from '@shared/types/values'


export class ListProcessHistoricAsAOptionsUseCase {
  constructor(
    private processHistoricRepository: ProcessHistoricRepository
  ) {}

  async execute(): Promise<OptionsControlledBox[] | null> {

    return await this.processHistoricRepository.findManyAsAOption();
  }
}