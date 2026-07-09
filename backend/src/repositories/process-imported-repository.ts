import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,  
} from "@shared/types/processImported"
import { OptionsControlledBox } from "@shared/types/values"


export interface ProcessImportedRepository {
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findManyByProcessHistoricIdAsAOption(processHistoricId: string): Promise<OptionsControlledBox[]> 
}