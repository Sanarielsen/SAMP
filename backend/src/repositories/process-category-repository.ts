import { ProcessCategory, ProcessCategoryCreateDTO } from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";

export interface ProcessCategoryRepository {
  create(data: ProcessCategoryCreateDTO): Promise<ProcessCategory>
  findManyOptionCategories(): Promise<OptionsControlledBox[]>
  findById(id: string): Promise<ProcessCategory | null>
}