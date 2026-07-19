import { randomUUID } from "node:crypto";

import { ProcessTypeRepository } from "@/repositories/process-type-repository";

import { ProcessTypeCreateDTO, ProcessType } from "@shared/types/processType";


export class InMemoryProcessTypeRepository implements ProcessTypeRepository {
  public items: ProcessType[] = []

  async create(data: ProcessTypeCreateDTO): Promise<ProcessType> {
    const newData: ProcessType = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deletedAt: null
    }
    
    this.items.push(newData)
        
    return newData
  }
  
  async findById(id: string): Promise<ProcessType | null> {
    const type = this.items.find(item => item.id == id)

    if (!type) {
      return null
    }

    return type
  }
}