import { ProcessCategory } from "@shared/types/processCategory";

export interface ProcessCategoryRepository {
  findById(id: string): Promise<ProcessCategory | null>
}