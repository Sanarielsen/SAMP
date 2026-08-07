import { 
  CreatedProcessImportedDTO,
  DetailsProcessImportedDTO,
  ImportedProcess,
  ImportedProcessCreateDTO,
  ImportedProcessFilter,
  ImportedProcessUpdateDTO,
  ImportedProcessWithDetails,  
} from "@shared/types/importedProcess"
import { OptionsControlledBox } from "@shared/types/values"


export interface ImportedProcessRepository {
  create(data: ImportedProcessCreateDTO): Promise<ImportedProcess>
  restore(id: string, data: ImportedProcessCreateDTO): Promise<ImportedProcess>
  createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number>
  update(data: Partial<ImportedProcessUpdateDTO>): Promise<ImportedProcess>
  delete(id: string): Promise<void>
  deleteManyByProcessHistoricId(processHistoricId: string): Promise<void>

  findById(id: string): Promise<ImportedProcess | null> 
  findByProcessNumber(processNumber: string): Promise<ImportedProcess | null>;
  findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcess[]>
  findManyDetailsWithSearch(search: string): Promise<ImportedProcessWithDetails[] | null>
  findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> 
  findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> 
}