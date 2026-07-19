import { randomUUID } from "node:crypto";

import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";

import { 
  CreateProcessHistoricDTO, 
  ProcessHistory, 
  ProcessHistoryDetailDTO 
} from "@shared/types/processHistory";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessHistoryRepository implements ProcessHistoryRepository {
  constructor(
    private processCategoryRepository: InMemoryProcessCategoryRepository,
  ) {}

  public items: ProcessHistory[] = []
  
  async create(data: CreateProcessHistoricDTO): Promise<ProcessHistory> {
    const newData: ProcessHistory = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
    }
    
    this.items.push(newData)
        
    return newData
  }
  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
  
  async findById(id: string): Promise<ProcessHistory | null> {
    const history = this.items.find(item => item.id == id)

    if (!history) {
      return null
    }

    return history
  }

  findAsADetailsById(id: string): Promise<ProcessHistoryDetailDTO | null> {
    throw new Error("Method not implemented.");
  }

  async findManyWithDetails(): Promise<ProcessHistoryDetailDTO[]> {
    return this.items.map((history) => {
      const category = this.processCategoryRepository.items.find(
        (category) => category.id === history.categoryId,
      );

      return {
        ...history,
        categoryName: category?.name ?? "",
      };
    });
  }

  findManyAsAOption(): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }

  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistory | null> {
    throw new Error("Method not implemented.");
  }
}