import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { CreateOrderTypeUseCase } from "@/services/use-cases/order-type/create";
import { InMemoryOrderTypeRepository } from "@/repositories/in-memory/order-type";


let orderTypeRepository: InMemoryOrderTypeRepository
let sut: CreateOrderTypeUseCase

describe('Create Order Type Use Case', () => {
  beforeEach(() => {
    orderTypeRepository = new InMemoryOrderTypeRepository()
    sut = new CreateOrderTypeUseCase(
      orderTypeRepository
    )
  })

  it('should create a new order type', async () => {

    const newOrderType = await sut.execute({
      title: 'title-test',
      description: 'descripion-test'
    })

    expect(newOrderType.title).toBe('title-test')
  })
})