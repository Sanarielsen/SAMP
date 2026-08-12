import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/in-memory-process-publication-repository";

import { ProcessPublication } from "@shared/types/processPublication";


export async function makeProcessPublication(
  repository: InMemoryProcessPublicationRepository,
  override: Partial<ProcessPublication> = {},
) {

  return repository.create({
		importedProcessId: 'imported-process-id-test',
    processMagazine: '1234',
    dispatch: 'dispatch-test',
    publicationDate: new Date(Date.now()),
    createdByUser: 'user-test',

    ...override,
  })
}