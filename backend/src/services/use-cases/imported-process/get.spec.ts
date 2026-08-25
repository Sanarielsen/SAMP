import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetImportedProcessUseCase } from "@/services/use-cases/imported-process/get";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/imported-process";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let importedProcessRepository: InMemoryImportedProcessRepository
let sut: GetImportedProcessUseCase

describe('Get Imported Process Use Case', () => {
  beforeEach(() => {
    importedProcessRepository = new InMemoryImportedProcessRepository
    sut =  new GetImportedProcessUseCase(
      importedProcessRepository
    )
  })

  it('should get an imported process', async () => {
    const importedProcess = await makeImportedProcess( importedProcessRepository )

    const process = await sut.execute(importedProcess.id)

    expect(process?.brand).toBe('Marca test')
  })

  it('should not get a non-existent imported process', async () => {
    await expect(() => sut.execute(
      'imported-process-id-non-existent'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})