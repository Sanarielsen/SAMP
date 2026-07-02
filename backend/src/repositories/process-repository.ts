import {
  CreateProcessImportedDTO
} from "@shared/types/process"
import { ProcessHistoric } from "@shared/types/processHistoric"

export interface ProcessRepository {
  createAsImport(importProps: CreateProcessImportedDTO): Promise<ProcessHistoric | null>
}