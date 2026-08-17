import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteOrderTypeUseCase } from "@/services/service-order-type/delete";
import { InMemoryOrderTypeRepository } from "@/repositories/in-memory/order-type";
import { makeOrderType } from "@/services/factories/order-type/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let orderTypeRepository: InMemoryOrderTypeRepository
let sut: DeleteOrderTypeUseCase

describe('Delete Order Type Use Case', () => {
  beforeEach(() => {
    orderTypeRepository = new InMemoryOrderTypeRepository()
    sut = new DeleteOrderTypeUseCase(
      orderTypeRepository
    )
  })

  it('should delete an order type', async () => {
    const newOrderType = await makeOrderType(orderTypeRepository)

    await sut.execute(newOrderType.id)

    expect(orderTypeRepository.items[0]).not.toBe(null)
  })

  it('should not delete a non-existent order type', async () => {

    await expect(() => sut.execute(
      404
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})