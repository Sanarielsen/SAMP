import { randomUUID } from "node:crypto";

import { ProcessTypeRepository } from "@/repositories/process-type-repository";

import { ProcessTypeCreateDTO, ProcessType } from "@shared/types/processType";
import { OptionsControlledBox } from "@shared/types/values";


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

  async delete(id: string): Promise<void> {
    const typeIndex = this.items.findIndex(type => {
      return type.id === id
    })
    
    const disabledType = {
      ...this.items[typeIndex],
      deletedAt: new Date(),
    }

    this.items[typeIndex] = disabledType
  }
  
  async findById(id: string): Promise<ProcessType | null> {
    const type = this.items.find(item => item.id == id)
    
    if (!type) {
      return null
    }
    
    return type
  }

  async findManyAsAnOption(): Promise<OptionsControlledBox[] | null> {
    const types = this.items.filter(item => item.deletedAt === null)

    if (!types) {
      return null
    }

    return types.map( (type) => ({
      label: type.name,
      value: type.id,
    }))
  }
}