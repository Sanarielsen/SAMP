import { ProcessCategory } from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";

export interface ProcessCategoryRepository {
  findManyOptionCategories(): Promise<OptionsControlledBox[]>
  findById(id: string): Promise<ProcessCategory | null>
}