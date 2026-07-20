import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListProcessTypeAsAnOptionUseCase } from "@/services/service-process-type/list-as-an-option";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { makeProcessType } from "@/services/factories/process-type/make-entity";

import { ProcessType } from "@shared/types/processType";


let processTypeRepository: InMemoryProcessTypeRepository
let sut: ListProcessTypeAsAnOptionUseCase
let newProcessTypeDeleted: ProcessType

describe('List Process Type As An Option Use Case', () => {
  beforeEach(async () => {
    processTypeRepository = new InMemoryProcessTypeRepository();
    sut = new ListProcessTypeAsAnOptionUseCase(processTypeRepository)

    makeProcessType(processTypeRepository, {
      name: 'process-type-1',
      slug: 'slug-type-1'
    })

    makeProcessType(processTypeRepository, {
      name: 'process-type-2',
      slug: 'slug-type-2'
    })

    newProcessTypeDeleted = await makeProcessType(processTypeRepository, {
      name: 'process-type-3',
      slug: 'slug-type-3'
    })
  })

  it('should query process type', async () => {

    await processTypeRepository.delete(newProcessTypeDeleted.id)

    const processTypeAnOption = await sut.execute()

    expect(processTypeAnOption).toHaveLength(2)
  })
})