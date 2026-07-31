import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,
  ImportedProcess,
  ImportedProcessFilter,
  ImportedProcessFromINPI,  
} from "@shared/types/processImported"
import { OptionsControlledBox } from "@shared/types/values"


export interface ImportedProcessRepository {
  create(data: CreatedProcessImportedDTO): Promise<ImportedProcess>
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]>
  findById(id: string): Promise<ImportedProcess | null> 
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findByProcessNumber(processNumber: string): Promise<ImportedProcessFromINPI>
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> 
  deleteManyByProcessHistoricId(processHistoricId: string): Promise<void>
}