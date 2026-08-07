import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteImportedProcessUseCase } from "@/services/service-imported-process/delete";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let importedProcessRepository: InMemoryImportedProcessRepository
let sut: DeleteImportedProcessUseCase


describe('Delete Imported Process Use Case', () => {
  beforeEach( async () => {
    importedProcessRepository = new InMemoryImportedProcessRepository
    sut = new DeleteImportedProcessUseCase(
      importedProcessRepository
    )
  })

  it('should delete imported process', async () => {  

    const importedProcessRegistered = await makeImportedProcess(importedProcessRepository)
    await sut.execute(importedProcessRegistered.id)

    expect(importedProcessRegistered.deletedAt).not.toBe(null)
  })

  it('should not delete a non-existent imported process', async () => {  
    await expect(() => sut.execute(
      'imported-process-id-non-existent'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})