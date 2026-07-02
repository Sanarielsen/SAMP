import { ProcessRepository } from "@/repositories/process-repository";

import { CreateProcessImportedDTO } from "@shared/types/process";


export class InMemoryProcessRepository implements ProcessRepository {
  //public items: Pro[] = []
  
  createAsImport(importProps: CreateProcessImportedDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}