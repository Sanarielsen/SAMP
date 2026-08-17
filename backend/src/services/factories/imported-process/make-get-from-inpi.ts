import { INPIClient } from "@/scripts/get-process-from-inpi";

import { GetImportedProcessFromINPIUseCase } from "@/services/use-cases/imported-process/get-from-inpi";


export function makeGetImportedProcessFromINPIUseCase() {
  const importedProcessFromINPIRepository = new INPIClient();
  
  return new GetImportedProcessFromINPIUseCase(
    importedProcessFromINPIRepository
  )
}