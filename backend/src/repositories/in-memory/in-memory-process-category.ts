import { randomUUID } from "node:crypto";

import { ProcessCategoryRepository } from "@/repositories/process-category-repository";

import { 
  ProcessCategory, 
  ProcessCategoryCreateDTO 
} from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessCategoryRepository implements ProcessCategoryRepository {
  public items: ProcessCategory[] = []
  
  async create(data: ProcessCategoryCreateDTO): Promise<ProcessCategory> {
    const newItem: ProcessCategory = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deletedAt: null
    }
    
    this.items.push(newItem)
    
    return newItem
  }
  findManyOptionCategories(): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }
  
  async findById(id: string): Promise<ProcessCategory | null> {
    const category = this.items.find(item => item.id == id)

    if (!category) {
      return null
    }

    return category
  }
}