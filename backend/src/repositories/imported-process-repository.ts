import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,
  ImportedProcess,
  ImportedProcessCreateDTO,
  ImportedProcessFilter,
  ImportedProcessFromINPI,
  ImportedProcessWithDetails,  
} from "@shared/types/importedProcess"
import { OptionsControlledBox } from "@shared/types/values"


export interface ImportedProcessRepository {
  create(data: ImportedProcessCreateDTO): Promise<ImportedProcess>
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  findById(id: string): Promise<ImportedProcess | null> 

  findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]>
  findManyDetailsWithSearch(search: string): Promise<ImportedProcessWithDetails[] | null>

  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findByProcessNumber(processNumber: string): Promise<ImportedProcessFromINPI>
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> 
  deleteManyByProcessHistoricId(processHistoricId: string): Promise<void>
}