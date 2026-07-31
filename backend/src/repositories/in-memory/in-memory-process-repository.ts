import { ImportedProcessRepository } from "@/repositories/process-imported-repository";

import { CreatedProcessImportedDTO, CreateProcessImportedDTO, DetailsProcessImportedDTO, ImportedProcess, ImportedProcessFilter, ImportedProcessFromINPI } from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessImportedRepository implements ImportedProcessRepository {
  create(data: CreatedProcessImportedDTO): Promise<ImportedProcess> {
    throw new Error("Method not implemented.");
  }
  findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ImportedProcess | null> {
    throw new Error("Method not implemented.");
  }
  findByProcessNumber(processNumber: string): Promise<ImportedProcessFromINPI> {
    throw new Error("Method not implemented.");
  }
  deleteManyByProcessHistoricId(processHistoricId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> {
    throw new Error("Method not implemented.");
  }
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {
    throw new Error("Method not implemented.");
  }
  
  createAsImport(importProps: CreateProcessImportedDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}