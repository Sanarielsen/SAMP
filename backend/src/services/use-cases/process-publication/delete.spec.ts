import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteProcessPublicationUseCase } from "@/services/use-cases/process-publication/delete";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/in-memory-process-publication-repository";
import { makeProcessPublication } from "@/services/factories/process-publication/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: DeleteProcessPublicationUseCase


describe('Delete Process Publication Use Case', () => {
  beforeEach(() => {
    processPublicationRepository = new InMemoryProcessPublicationRepository()
    sut = new DeleteProcessPublicationUseCase(
      processPublicationRepository
    )
  })

  it('should soft delete an publication', async () => {
    const newProcessPublication = await makeProcessPublication( processPublicationRepository )

    await sut.execute(newProcessPublication.id)

    expect(processPublicationRepository.items[0]).not.toBe(null)
  })

  it('should not soft delete an non-existent publication', async () => {

    await expect(() => sut.execute(
      'non-existent-publication'      
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})