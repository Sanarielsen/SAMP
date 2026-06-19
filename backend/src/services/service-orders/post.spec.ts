import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";
import { hash } from "bcryptjs";

import { CreateOrderUseCase } from "@/services/service-orders/post";

import { ClientRepository } from "@/repositories/client-repository";
import { OrderRepository } from "@/repositories/order-repository";
import { UserRepository } from "@/repositories/user-repository";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let userRepository: UserRepository
let clientRepository: ClientRepository
let orderRepository: OrderRepository

let sut: CreateOrderUseCase

describe('Post Order Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository();
    clientRepository = new InMemoryClientsRepository();
    orderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(userRepository, clientRepository, orderRepository)

    await userRepository.create({
      id: "user-1",
      name: 'Samuel Teste',
      email: 'samuel@teste.com',
      password_hash: await hash('123456', 6),
    })

    await clientRepository.create({
      id: "client-1",
      legalName: "Client Test Razao social",
      tradeName: "Client Teste Nome Fantasia",
      type: 2,
      protocol: "12345678912345",
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 10, 102, Bairro 1, Cidade 2, Estado 3, Pais 4 - 01234123",
      correspondenceAddress: "Rua 11, 102, Bairro 11, Cidade 22, Estado 33, Pais 44 - 1234512",
      nameContact: "Samuel",
      numberContact: "11912341234",
      isActivated: true,
      createdAt: new Date(Date.now()),
      createdById: "user-1",
      responsibleById: "user-1"       
    })
    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible post a new order', async () => {

    const createdOrder = await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 1,
      eventDate: new Date(Date.now()),
      observation: 'Order test'
    })

    const order = await sut.execute({
      userId: 'user-1',
      order: createdOrder
    })

    expect(order.observation).toEqual('Order test')
  })

  it('should not be possible post a new order with client non-exist', async () => {
    const createdOrder = await orderRepository.create({
      clientId: 'client-2',
      orderTypeId: 1,
      eventDate: new Date(Date.now()),
      observation: 'Order test'
    })

    await expect(() => sut.execute({
      userId: 'user-1',
      order: createdOrder
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be possible post a new order with user non-exist', async () => {
    const createdOrder = await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 1,
      eventDate: new Date(Date.now()),
      observation: 'Order test'
    })

    await expect(() => sut.execute({
      userId: 'user-2',
      order: createdOrder
    })).rejects.toBeInstanceOf(NonExistUserError)
  })
})