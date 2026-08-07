import { 
  ImportedProcess,
  ImportedProcessCreateDTO,
  ImportedProcessUpdateDTO,
  ImportedProcessWithDetails,  
} from "@shared/types/importedProcess"


export interface ImportedProcessRepository {
  create(data: ImportedProcessCreateDTO): Promise<ImportedProcess>
  restore(id: string, data: ImportedProcessCreateDTO): Promise<ImportedProcess>
  update(data: Partial<ImportedProcessUpdateDTO>): Promise<ImportedProcess>
  delete(id: string): Promise<void>

  findById(id: string): Promise<ImportedProcess | null> 
  findByProcessNumber(processNumber: string): Promise<ImportedProcess | null>;
  findManyDetailsWithSearch(search: string): Promise<ImportedProcessWithDetails[] | null>
}