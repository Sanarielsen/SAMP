import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/imported-process";

import { ImportedProcess } from "@shared/types/importedProcess";


export async function makeImportedProcess(
  repository: InMemoryImportedProcessRepository,
  override: Partial<ImportedProcess> = {},
) {
  return repository.create({
    userIdLogged: "user-logged-id",
    clientId: "client-test",

    processNumber: "123456789",
    processMagazine: "1234",
    processStatus: "pending",
    holder: "Titular test",
    brand: "Marca test",
    nature: "Natureza test",
    presentation: "Apresentacao test",
    specification: "Specificacao test",

    filingDate:     new Date("2026-01-10"),
    grantDate:      new Date("2026-01-11"),
    expirationDate: new Date("2026-01-12"),

    createdByUser: "user-test-created",
    updatedByUser: "user-test-updated",

    createdAt: new Date(),

    ...override,
  })
}