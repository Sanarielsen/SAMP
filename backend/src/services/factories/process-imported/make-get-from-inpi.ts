import { GetImportedProcessFromINPIUseCase } from "@/services/service-process-imported/get-imported-process-from-inpi";

export function makeGetImportedProcessFromINPIUseCase() {
  return new GetImportedProcessFromINPIUseCase()
}