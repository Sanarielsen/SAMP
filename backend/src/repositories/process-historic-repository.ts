import {
  CreateProcessHistoricDTO,
  DetailsProcessHistoryDTO,
  ProcessHistoric
} from "@shared/types/processHistoric"
import { OptionsControlledBox } from "@shared/types/values"

export interface ProcessHistoricRepository {
  create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric | null>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ProcessHistoric | null>
  findAsADetailsById(id: string): Promise<DetailsProcessHistoryDTO | null>
  findManyAsAOption(): Promise<OptionsControlledBox[]>
  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null>
}