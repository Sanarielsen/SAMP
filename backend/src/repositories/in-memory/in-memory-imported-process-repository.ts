import { randomUUID } from "node:crypto";

import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO, 
  ImportedProcess, 
  ImportedProcessCreateDTO, 
  ImportedProcessFilter,
  ImportedProcessUpdateDTO,
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

  async restore(id: string, data: ImportedProcessCreateDTO): Promise<ImportedProcess> {
    const importedProcessIdenitity = this.items.findIndex(process => {
      return process.id === id
    })

    const updatedProcess = {
      ...this.items[importedProcessIdenitity],
      ...data,
      deletedAt: null,
    }

    this.items[importedProcessIdenitity] = updatedProcess

    return updatedProcess
  }

  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async update(data: ImportedProcessUpdateDTO): Promise<ImportedProcess> {
    const importedProcessIdenitity = this.items.findIndex(process => {
      return process.id === data.id
    })

    const updatedProcess = {
      ...this.items[importedProcessIdenitity],
      ...data,
    }

    this.items[importedProcessIdenitity] = updatedProcess

    return updatedProcess
  }

  async delete(id: string): Promise<void> {
    const processIndex = this.items.findIndex(process => {
      return process.id === id
    })

    const disabledProcess = {
      ...this.items[processIndex],
      deletedAt: new Date(),
    }

    this.items[processIndex] = disabledProcess
  }

  async findById(id: string): Promise<ImportedProcess | null> {
    const importedProcess = this.items.find(item => item.id == id)

    if (!importedProcess) {
      return null
    }

    return importedProcess
  }

  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> {
    throw new Error("Method not implemented.");
  }

  async findByProcessNumber(processNumber: string): Promise<ImportedProcess | null> {
    const importedProcess = this.items.find(item => item.processNumber == processNumber)

    if (!importedProcess) {
      return null
    }

    return importedProcess
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