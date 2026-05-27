
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { OrderRepository } from "@/repositories/order-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";
import { ListOrderUseCase } from "./list";
import { hash } from "bcryptjs";

let userRepository: UsersRepository
let orderRepository: OrderRepository
let sut: ListOrderUseCase

describe('List Orders Use Case', () => {
  beforeEach(async () => {
    orderRepository = new InMemoryOrderRepository()
    userRepository = new InMemoryUsersRepository()
    sut = new ListOrderUseCase(userRepository, orderRepository)
    
    await userRepository.create({
      id: "user-1",
      name: 'Samuel Teste',
      email: 'samuel@teste.com',
      password_hash: await hash('123456', 6),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return orders', async () => {
    await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 3,
      eventDate: new Date(Date.now()),
      observation: ''
    })

    await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 4,
      eventDate: new Date(Date.now()),
      observation: ''
    })

    await orderRepository.create({
      clientId: 'client-2',
      orderTypeId: 4,
      eventDate: new Date(Date.now()),
      observation: ''
    })

    const orderSearched = await 
      orderRepository.findManyByClientId("client-1")

    expect(orderSearched).toHaveLength(2)
  })

  it('should return an empty array where there are no orders', async () => {

    const orderSearched = await 
      orderRepository.findManyByClientId("client-1")

    expect(orderSearched).toHaveLength(0)
  })
})


