import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdateOrderTypeUseCase } from "@/services/service-order-type/update";
import { InMemoryOrderTypeRepository } from "@/repositories/in-memory/order-type";
import { makeOrderType } from "@/services/factories/order-type/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let orderTypeRepository: InMemoryOrderTypeRepository
let sut: UpdateOrderTypeUseCase

describe('Update Order Type Use Case', () => {
  beforeEach(() => {
    orderTypeRepository = new InMemoryOrderTypeRepository()
    sut = new UpdateOrderTypeUseCase(
      orderTypeRepository
    )
  })

  it('should create a new order type', async () => {

    const updatedTitle = 'updated-title'

    const newOrderType = await makeOrderType( orderTypeRepository )
    
    const updatedOrderType = await sut.execute({
      id: newOrderType.id,
      title: updatedTitle
    })

    expect(updatedOrderType.title).toBe(updatedTitle)
  })

  it('should not update a non-existent order type', async () => {
    await expect(() => sut.execute({
      id: 404,
      title: 'invalid-order-type'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})