import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";

import { ImportedProcess } from "@shared/types/processImported";


export async function makeImportedProcess(
  repository: InMemoryImportedProcessRepository,
  override: Partial<ImportedProcess> = {},
) {
  return repository.create({
    processHistoricId: "process-historic-test",
    processCategoryId: "process-category-test",
    processTypeId: "process-type-test",

    processNumber: "BR-001-2024",
    holder: "John Doe",
    dispatchDetails: null,
    attorney: null,
    presentation: null,
    nature: null,
    markName: null,
    ncl: null,
    specification: null,
    translatedSpecification: null,
    internationalRegistrationNumber: null,
    cfe: null,

    status: "pending",
    sourceText: "Source text content",
    sourcePage: 1,
    importedByUser: "user-test",
    depositDate: null,
    receivedDate: null,
    grantDate: null,
    createdAt: new Date(),

    ...override,
  })
}