import { randomUUID } from "node:crypto";

import { ImportedProcessRepository } from "@/repositories/process-imported-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO, 
  ImportedProcess, 
  ImportedProcessFilter 
} from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryImportedProcessRepository implements ImportedProcessRepository {
  public items: ImportedProcess[] = []

  async create(data: CreatedProcessImportedDTO): Promise<ImportedProcess> {
    const newItem: ImportedProcess = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now())
    }
    
    this.items.push(newItem)
    
    return newItem
  }

  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<ImportedProcess | null> {
    throw new Error("Method not implemented.");
  }

  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> {
    throw new Error("Method not implemented.");
  }

  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }

  async findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]> {
    return this.items.filter((process) => {

      const normalizedSearch = search.toLowerCase();

      const matchesSearch =
        !search ||
        process.processNumber.toLowerCase().includes(normalizedSearch) ||
        process.holder.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        process.processCategoryId === filter.categoryId;

      const matchesType =
        !filter.typeId ||
        process.processTypeId === filter.typeId;

      const matchesHistory =
        !filter.historyId ||
        process.processHistoricId === filter.historyId;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesHistory
      );
    });
  }
}