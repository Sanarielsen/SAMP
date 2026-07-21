import {
  CreateProcessHistoricDTO,
  ProcessHistoryDetailDTO,
  ProcessHistoric
} from "@shared/types/processHistoric"
import { OptionsControlledBox } from "@shared/types/values"

export interface ProcessHistoryRepository {
  create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ProcessHistoric | null>
  findAsADetailsById(id: string): Promise<ProcessHistoryDetailDTO | null>
  findManyWithDetails(): Promise<ProcessHistoryDetailDTO[]>
  findManyAsAOption(): Promise<OptionsControlledBox[]>
  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null>
}