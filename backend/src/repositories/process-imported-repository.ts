import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,
  ProcessImported,  
} from "@shared/types/processImported"
import { OptionsControlledBox } from "@shared/types/values"


export interface ProcessImportedRepository {
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  findById(id: string): Promise<ProcessImported | null> 
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> 
}