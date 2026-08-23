import { randomUUID } from "node:crypto";

import { ImportedProcessRepository } from "@/repositories/imported-process";

import { 
  ImportedProcess, 
  ImportedProcessCreateDTO, 
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
}