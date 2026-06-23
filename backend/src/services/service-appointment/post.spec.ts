import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { PostAppointmentUseCase } from "@/services/service-appointment/post";

import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeOrder } from "@/services/factories/order/make-order-entity";
import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";


let appointmentRepository: InMemoryAppointmentRepository
let orderRepository: InMemoryOrderRepository
let clientRepository: InMemoryClientsRepository
let sut: PostAppointmentUseCase
let newAppointment: Appointment

describe('Post Appointment Use Case', () => {
  beforeEach( async () => {
    appointmentRepository = new InMemoryAppointmentRepository()
    clientRepository = new InMemoryClientsRepository()
    orderRepository = new InMemoryOrderRepository()

    sut = new PostAppointmentUseCase(
      appointmentRepository,
      clientRepository,
      orderRepository
    )

    newAppointment = await makeAppointment(appointmentRepository)
  })

  it('should add a new appointment for a valid client', async () => {
    await makeClient(clientRepository, {
      id: newAppointment.clientId,
      createdById: newAppointment.clientId,
      responsibleById: newAppointment.clientId,
    })

    const newOrder = await makeOrder(orderRepository)

    newAppointment = await makeAppointment(appointmentRepository, {
      orderId: newOrder.id
    })

    const createdAppointment = await sut.execute(newAppointment)

    expect(createdAppointment.description).toEqual('Appointment test')
  })

  it('should not add a new appointment for a non-existent order', async () => {
    await makeClient(clientRepository, {
      id: newAppointment.clientId,
      createdById: 'user-1',
      responsibleById: 'user-1',
    })

    await expect(
      sut.execute({
        ...newAppointment,
        orderId: 'invalid-order',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not add a new appointment for an invalid client', async () => {
    
    await expect(() => sut.execute({
      ...newAppointment,
      clientId: 'invalid-client'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not add a new appointment if the provided order does not exist', async () => {
    await expect(() => sut.execute({
      ...newAppointment,
      orderId: 'invalid-order'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })


  it('should not add a new appointment if the provided order does null', async () => {
    await expect(() => sut.execute({
      ...newAppointment,
      orderId: ''
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})




