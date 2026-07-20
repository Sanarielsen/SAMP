import { ProcessTypeRepository } from "@/repositories/process-type-repository";

import { OptionsControlledBox } from "@shared/types/values";


export class ListProcessTypeAsAnOptionUseCase {
  constructor(
    private processTypeRepository: ProcessTypeRepository
  ) {}

  async execute(): Promise<OptionsControlledBox[] | null> {
    
    return this.processTypeRepository.findManyAsAnOption();
  }
}