import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { PostAppointmentUseCase } from "@/services/service-appointment/post";

import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeOrder } from "@/services/factories/order/make-order-entity";
import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UserNotResponsibleForClientError } from "@/services/errors/non-responsable-user";

import { Appointment } from "@shared/types/appointment";
import { User } from "@shared/types/user";
import { Order } from "@shared/types/orders";
import { Client } from "@shared/types/client";


let appointmentRepository: InMemoryAppointmentRepository
let orderRepository: InMemoryOrderRepository
let clientRepository: InMemoryClientsRepository
let userRepository: InMemoryUserRepository
let sut: PostAppointmentUseCase
let newAppointment: Appointment
let newOrder: Order
let newClient: Client
let newUser: User

describe('Post Appointment Use Case', () => {
  beforeEach( async () => {
    appointmentRepository = new InMemoryAppointmentRepository()
    clientRepository = new InMemoryClientsRepository()
    orderRepository = new InMemoryOrderRepository()
    userRepository = new InMemoryUserRepository()

    sut = new PostAppointmentUseCase(
      appointmentRepository,
      clientRepository,
      userRepository,
      orderRepository
    )

    newUser = await makeUser(userRepository)
    newClient = await makeClient(clientRepository, {
      responsibleById: newUser.id,
      createdById: newUser.id
    })
    newOrder = await makeOrder(orderRepository, {
      clientId: newClient.id
    })
    newAppointment = await makeAppointment(appointmentRepository, {
      clientId: newClient.id
    })
  })

  it('should add a new appointment for a valid client', async () => {
    const createdAppointment = await sut.execute({
      idUser: newUser.id,
      data: newAppointment
    })

    expect(createdAppointment.description).toEqual('Appointment test')
  })

  it('should not add a new appointment for a non-existent order', async () => {
    await expect(
      sut.execute({
        idUser: newUser.id,
        data: {
          ...newAppointment,
          orderId: 'invalid-order',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not add a new appointment for an invalid user', async () => {

    await expect(() => sut.execute({
      idUser: 'invalid-user',
      data: newAppointment
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not add a new appointment for an non-responsable user of client', async () => {

    const newUserDifferent = await makeUser(userRepository)

    const newClientWithInvalidResponsable = await makeClient(clientRepository, {
      responsibleById: newUserDifferent.id,
      createdById: newUser.id
    })

    const newAppointmentWithInvalidUser = await makeAppointment(appointmentRepository, {
      clientId: newClientWithInvalidResponsable.id
    })

    await expect(() => sut.execute({
      idUser: newUser.id,
      data: newAppointmentWithInvalidUser
    })).rejects.toBeInstanceOf(UserNotResponsibleForClientError)
  })

  it('should not add a new appointment for an invalid client', async () => {

    const newAppointmentWithInvalidClient = await makeAppointment(appointmentRepository, {
      clientId: 'invalid-client'
    })
    
    await expect(() => sut.execute({
      idUser: newUser.id,
      data: newAppointmentWithInvalidClient
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not add a new appointment if the provided order does not exist', async () => {

    const newAppointmentWithInvalidOrder = await makeAppointment(appointmentRepository, {
      orderId: 'invalid-order'
    })

    await expect(() => sut.execute({
      idUser: newUser.id,
      data: newAppointmentWithInvalidOrder
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})




