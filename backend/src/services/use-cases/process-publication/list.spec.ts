import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListProcessPublicationsUseCase } from "@/services/use-cases/process-publication/list";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/imported-process";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/process-publication";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { makeProcessPublication } from "@/services/factories/process-publication/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let importedProcessRepository: InMemoryImportedProcessRepository
let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: ListProcessPublicationsUseCase

describe('List Process Publications Use Case', () => {
  beforeEach(() => {  
    importedProcessRepository = new InMemoryImportedProcessRepository();
    processPublicationRepository = new InMemoryProcessPublicationRepository();

    sut = new ListProcessPublicationsUseCase(
      importedProcessRepository,
      processPublicationRepository
    )
  })

  it('should list publications of process', async () => {

    const newImportedProcess = await makeImportedProcess( importedProcessRepository, {
      brand: 'sana-test'
    } )

    await makeProcessPublication( processPublicationRepository, {
      importedProcessId: newImportedProcess.id
    } )

    await makeProcessPublication( processPublicationRepository, {
      importedProcessId: newImportedProcess.id
    } )

    const processPublications = await sut.execute(
      newImportedProcess.id
    )

    expect(processPublications).toHaveLength(2)
  })

  it('should not list any publication with non-existent imported process', async () => {

    await expect(() => sut.execute(
      'non-existent-imported-process'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})