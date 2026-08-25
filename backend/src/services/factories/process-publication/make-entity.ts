import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/process-publication";

import { ProcessPublication } from "@shared/types/processPublication";


export async function makeProcessPublication(
  repository: InMemoryProcessPublicationRepository,
  override: Partial<ProcessPublication> = {},
) {

  return repository.create({
		importedProcessId: 'imported-process-id-test',
    magazineNumber: '1234',
    dispatch: 'dispatch-test',
    certificate: 'certificate-test',
    publicationDate: new Date(Date.now()),
    description: 'description-test',
    complement: 'complement-test',
    createdByUser: 'user-test',

    ...override,
  })
}