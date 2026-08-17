import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetOrderTypeUseCase } from "@/services/service-order-type/get";
import { InMemoryOrderTypeRepository } from "@/repositories/in-memory/order-type";
import { makeOrderType } from "@/services/factories/order-type/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let orderTypeRepository: InMemoryOrderTypeRepository
let sut: GetOrderTypeUseCase

describe('Get Order Type Use Case', () => {
  beforeEach(() => {
    orderTypeRepository = new InMemoryOrderTypeRepository()
    sut = new GetOrderTypeUseCase(
      orderTypeRepository
    )
  })

  it('should get an order type', async () => {

    const newOrderType = await makeOrderType( orderTypeRepository )

    const searchedOrderType = await sut.execute(newOrderType.id)
    
    expect(searchedOrderType?.title).toBe('title-test')
  })

  it('should not get an invalid order type', async () => {
    await expect(() => sut.execute(
      404
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})