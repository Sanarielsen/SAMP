import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ListAppointmentUseCase } from "@/services/service-appointment/list";

import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { makeClient } from "@/services/factories/client/make-entity";
import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let appointmentRepository: InMemoryAppointmentRepository
let clientRepository: InMemoryClientsRepository
let sut: ListAppointmentUseCase

describe('List Appointments Use Case', () => {
  beforeEach( async () => {
    appointmentRepository = new InMemoryAppointmentRepository()
    clientRepository = new InMemoryClientsRepository();
    sut = new ListAppointmentUseCase(appointmentRepository, clientRepository)
  })

  it('should list appointments with valid client', async () => {
    const newClient = await makeClient(clientRepository)    

    await makeAppointment(appointmentRepository, {
      clientId: newClient.id,
      deletedAt: new Date(Date.now())
    })
    await makeAppointment(appointmentRepository, {
      clientId: newClient.id,
      deletedAt: null
    })
    await makeAppointment(appointmentRepository, {
      clientId: newClient.id,
      deletedAt: null
    })

    const appointments = await sut.execute(newClient.id)
    
    expect(appointments).toHaveLength(2)
  })

  it('should not list appointments with an invalid client', async () => {
    await expect(() => sut.execute(
      'invalid-client-id'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})