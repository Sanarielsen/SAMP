import { ProcessCategoryRepository } from "@/repositories/process-category-repository";

import { ProcessCategory } from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessCategoryRepository implements ProcessCategoryRepository {
  public items: ProcessCategory[] = []

  findManyOptionCategories(): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ProcessCategory | null> {
    throw new Error("Method not implemented.");
  }
}