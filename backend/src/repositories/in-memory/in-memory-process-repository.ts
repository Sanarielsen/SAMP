import { ProcessImportedRepository } from "@/repositories/process-imported-repository";

import { CreatedProcessImportedDTO, CreateProcessImportedDTO, DetailsProcessImportedDTO } from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryProcessImportedRepository implements ProcessImportedRepository {
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