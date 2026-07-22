import {
  CreateProcessHistoricDTO,
  ProcessHistoryDetailDTO,
  ProcessHistory
} from "@shared/types/processHistory"
import { OptionsControlledBox } from "@shared/types/values"

export interface ProcessHistoryRepository {
  create(data: CreateProcessHistoricDTO): Promise<ProcessHistory>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ProcessHistory | null>
  findAsADetailsById(id: string): Promise<ProcessHistoryDetailDTO | null>
  findManyWithDetails(): Promise<ProcessHistoryDetailDTO[]>
  findManyAsAOption(): Promise<OptionsControlledBox[]>
  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistory | null>
}