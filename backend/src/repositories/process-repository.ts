import {
  CreatedProcessImportedDTO,
} from "@shared/types/process"

export interface ProcessRepository {
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
}