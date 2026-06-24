import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { makeOrder } from "@/services/factories/order/make-order-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";

import { ListOrdersWithOptionsUseCase } from "@/services/service-orders/list-options";


let orderRepository: InMemoryOrderRepository;
let clientRepository: InMemoryClientsRepository;
let sut: ListOrdersWithOptionsUseCase

describe('List Orders With Options Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    clientRepository = new InMemoryClientsRepository();
    sut = new ListOrdersWithOptionsUseCase(orderRepository, clientRepository);
  })

  it('should list user options', async () => {
    const newClient = await makeClient(clientRepository)

    await makeOrder(orderRepository, {
      clientId: newClient.id
    })
    await makeOrder(orderRepository, {
      clientId: newClient.id
    })

    const options = await sut.execute(newClient.id)

    expect(options).toHaveLength(2)
  })
})