import { hash } from "bcryptjs";
import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";

import { GetOrderUseCase } from "./get";

import { OrderRepository } from "@/repositories/order-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

let userRepository: UsersRepository
let orderRepository: OrderRepository
let sut: GetOrderUseCase

describe('Get Order Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUsersRepository();
    orderRepository = new InMemoryOrderRepository();
    sut = new GetOrderUseCase(userRepository, orderRepository)

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

  it('should return a valid order', async () => {

    const createdOrder = await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 3,
      eventDate: new Date(Date.now()),
      observation: ''
    })

    const order = await sut.execute({
      id: createdOrder.id,
      userId: 'user-1'
    })

    expect(order).toEqual(
      expect.objectContaining({
        id: createdOrder.id,  
      }),
    )
  })

  it('should not be return a valid order with user invalid', async () => {
    const createdOrder = await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 3,
      eventDate: new Date(Date.now()),
      observation: ''
    })
    
    await expect(() => sut.execute({
      id: createdOrder.id,
      userId: 'user-2'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})