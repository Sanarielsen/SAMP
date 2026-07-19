import {
  ProcessType,
  ProcessTypeCreateDTO,
} from "@shared/types/processType"
import { OptionsControlledBox } from "@shared/types/values"


export interface ProcessTypeRepository {
  create(data: ProcessTypeCreateDTO): Promise<ProcessType>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ProcessType | null>
  findManyAsAnOption(): Promise<OptionsControlledBox[] | null>
}