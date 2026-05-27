import { hash } from "bcryptjs";
import { 
  afterEach,
  beforeEach,
  describe,
  expect,
  it, 
  vi
} from "vitest";

import { ListOrderUseCase } from "./list";

import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { OrderRepository } from "@/repositories/order-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

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

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return an empty array when no orders exist', async () => {
    const orders = await sut.execute({
      clientId: 'client-10',
      userId: 'user-1',
    })

    expect(orders).toEqual([])
  })

  it('should throw an error when user does not exist', async () => {

    await expect(() =>
      sut.execute({
        clientId: 'client-10',
        userId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})


