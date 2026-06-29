import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListAppointmentsByOrderUseCase } from "@/services/service-appointment/list-by-order";
import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { makeOrder } from "@/services/factories/order/make-order-entity";
import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let appointmentRepository: InMemoryAppointmentRepository
let orderRepository: InMemoryOrderRepository
let sut: ListAppointmentsByOrderUseCase

describe('List Appointment By Order Use Case', () => {
  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository()
    orderRepository = new InMemoryOrderRepository()
    sut = new ListAppointmentsByOrderUseCase(
      appointmentRepository, 
      orderRepository
    )
  })

  it('should list appointments for a valid order', async () => {
    const newOrder = await makeOrder(orderRepository)    

    await makeAppointment(appointmentRepository, {
      orderId: newOrder.id,
      deletedAt: new Date(Date.now())
    })
    await makeAppointment(appointmentRepository, {
      orderId: newOrder.id,
      deletedAt: null
    })
    await makeAppointment(appointmentRepository, {
      orderId: newOrder.id,
      deletedAt: null
    })

    const appointments = await sut.execute(newOrder.id)
    
    expect(appointments).toHaveLength(2)
  })

  it('should not list appointments for a non-existent order', async () => {
    await expect(() => sut.execute(
      'invalid-order-id'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})