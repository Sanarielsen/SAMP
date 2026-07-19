import { randomUUID } from "node:crypto";

import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";

import { 
  CreateProcessHistoricDTO, 
  ProcessHistoric, 
  DetailsProcessHistoryDTO 
} from "@shared/types/processHistoric";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessHistoryRepository implements ProcessHistoricRepository {
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

  findAsADetailsById(id: string): Promise<DetailsProcessHistoryDTO | null> {
    throw new Error("Method not implemented.");
  }
  findManyAsAOption(): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }
  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null> {
    throw new Error("Method not implemented.");
  }
}