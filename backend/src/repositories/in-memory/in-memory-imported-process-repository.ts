import { randomUUID } from "node:crypto";

import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO, 
  ImportedProcess, 
  ImportedProcessCreateDTO, 
  ImportedProcessFilter, 
  ImportedProcessFromINPI,
  ImportedProcessWithDetails
} from "@shared/types/importedProcess";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryImportedProcessRepository implements ImportedProcessRepository {
  public items: ImportedProcess[] = []

  async create(data: ImportedProcessCreateDTO): Promise<ImportedProcess> {
    const newItem: ImportedProcess = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
      createdByUser: data.userIdLogged,
      updatedByUser: data.userIdLogged
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

  findByProcessNumber(processNumber: string): Promise<ImportedProcessFromINPI> {
    throw new Error("Method not implemented.");
  }

  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }

  async findManyDetailsWithSearch(search: string): Promise<ImportedProcessWithDetails[] | null> {
    const normalizedSearch = search.toLowerCase();

    return this.items.filter((process) => {
      const matchesSearch =
        !search ||
        process.processNumber.toLowerCase().includes(normalizedSearch) ||
        process.brand.toLowerCase().includes(normalizedSearch);

      return (
        matchesSearch,
      );
    });
  }

  async findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]> {
    throw new Error("Method not implemented.");
    // return this.items.filter((process) => {

    //   const normalizedSearch = search.toLowerCase();

    //   const matchesSearch =
    //     !search ||
    //     process.processNumber.toLowerCase().includes(normalizedSearch) ||
    //     process.holder.toLowerCase().includes(normalizedSearch);

    //   const matchesCategory =
    //     process.processCategoryId === filter.categoryId;

    //   const matchesType =
    //     !filter.typeId ||
    //     process.processTypeId === filter.typeId;

    //   const matchesHistory =
    //     !filter.historyId ||
    //     process.processHistoricId === filter.historyId;

    //   return (
    //     matchesSearch &&
    //     matchesCategory &&
    //     matchesType &&
    //     matchesHistory
    //   );
    // });
  }

  async deleteManyByProcessHistoricId(processHistoricId: string): Promise<void> {
    throw new Error("Method not implemented.");
    // this.items = this.items.filter((item) => item.processHistoricId !== processHistoricId);
  }
}