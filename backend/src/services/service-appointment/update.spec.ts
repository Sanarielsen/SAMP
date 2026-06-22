import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { UpdateAppointmentUseCase } from "@/services/service-appointment/update";

import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { makeClient } from "@/services/factories/client/make-entity";
import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";
import { Client } from "@shared/types/client";


let appointmentRepository: InMemoryAppointmentRepository
let clientRepository: InMemoryClientsRepository
let orderRepository: InMemoryOrderRepository
let sut: UpdateAppointmentUseCase
let existedAppointment: Appointment
let existedClient: Client

describe('Update Appointment Use Case', () => {
  beforeEach( async () => {
    appointmentRepository = new InMemoryAppointmentRepository();
    clientRepository = new InMemoryClientsRepository();
    orderRepository = new InMemoryOrderRepository();

    sut = new UpdateAppointmentUseCase(
      appointmentRepository,
      clientRepository,
      orderRepository
    )

    existedClient = await makeClient(clientRepository)
    existedAppointment = await makeAppointment(appointmentRepository, {
      clientId: existedClient.id
    })
  })

  it('should update a valid appointment', async () => {

    const descriptionUpdated = 'description updated'
    const baseField = existedAppointment.appointmentAt

    const updatedAppointment = await sut.execute({
      id: existedAppointment.id,
      clientId: existedAppointment.clientId,
      description: descriptionUpdated
    })

    expect(updatedAppointment.description).toBe(descriptionUpdated)
    expect(updatedAppointment.appointmentAt).toBe(baseField)
  })

  it('should not update a non-existent appointment', async () => {
    await expect(() => sut.execute({
      id: 'invalid-appointment-id',
      clientId: existedClient.id!
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an appointment with a non-existent client', async () => {
    await expect(() => sut.execute({
      id: existedAppointment.id,
      clientId: 'invalid-client-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update an appointment with a non-existent order', async () => {
    await expect(() => sut.execute({
      id: existedAppointment.id,
      clientId: existedClient.id!,
      orderId: 'invalid-order-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})