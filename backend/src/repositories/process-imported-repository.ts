import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,
  ImportedProcess,
  ImportedProcessFilter,  
} from "@shared/types/processImported"
import { OptionsControlledBox } from "@shared/types/values"


export interface ImportedProcessRepository {
  create(data: CreatedProcessImportedDTO): Promise<ImportedProcess>
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]>
  findById(id: string): Promise<ImportedProcess | null> 
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> 
}