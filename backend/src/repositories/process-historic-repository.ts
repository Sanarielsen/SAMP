import {
  CreateProcessHistoricDTO,
  ProcessHistoric
} from "@shared/types/processHistoric"

export interface ProcessHistoricRepository {
  create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric | null>
  delete(id: string): Promise<void>
  findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null>
}