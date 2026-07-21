import { randomUUID } from "node:crypto";

import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";

import { 
  CreateProcessHistoricDTO, 
  ProcessHistoric, 
  ProcessHistoryDetailDTO 
} from "@shared/types/processHistoric";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessHistoryRepository implements ProcessHistoryRepository {
  constructor(
    private processCategoryRepository: InMemoryProcessCategoryRepository,
  ) {}

  public items: ProcessHistoric[] = []
  
  async create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric> {
    const newData: ProcessHistoric = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
    }
    
    this.items.push(newData)
        
    return newData
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async findById(id: string): Promise<ProcessHistoric | null> {
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

  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null> {
    throw new Error("Method not implemented.");
  }
}