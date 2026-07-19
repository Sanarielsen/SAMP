import {
  ProcessType,
  ProcessTypeCreateDTO,
} from "@shared/types/processType"


export interface ProcessTypeRepository {
  create(data: ProcessTypeCreateDTO): Promise<ProcessType>
  findById(id: string): Promise<ProcessType | null>
}