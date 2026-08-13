import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetProcessPublicationUseCase } from "@/services/service-process-publication/get";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/in-memory-process-publication-repository";
import { makeProcessPublication } from "@/services/factories/process-publication/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: GetProcessPublicationUseCase

describe('Get Process Publication Use Case', () => {
  beforeEach(() => {
    processPublicationRepository = new InMemoryProcessPublicationRepository

    sut = new GetProcessPublicationUseCase(
      processPublicationRepository
    )
  })

  it('should query a publication', async () => {

    const newPublication = await makeProcessPublication( processPublicationRepository )

    const publicationSearched = await sut.execute(newPublication.id)
    
    expect(publicationSearched.dispatch).toBe('dispatch-test')
  })

  it('should not query a non-existent publication', async () => {
    await expect(() => sut.execute(
      'non-existent-publication',
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})