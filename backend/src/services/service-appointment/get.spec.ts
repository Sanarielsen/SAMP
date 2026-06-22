import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";
import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetAppointmentUseCase } from "@/services/service-appointment/get";
import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";

let appointmentRepository: InMemoryAppointmentRepository
let sut: GetAppointmentUseCase
let newAppointment: Appointment

describe('Get Appointment Use Case', () => {
  beforeEach( async () => {
    appointmentRepository = new InMemoryAppointmentRepository();
    sut = new GetAppointmentUseCase(appointmentRepository)

    newAppointment = await makeAppointment(appointmentRepository)
  })

  it('should get appointment registered', async () => {
    const appointment = await sut.execute(newAppointment.id)

    expect(appointment).toBeDefined()
  })

  it('should not get a non-existent appointment', async () => {
    await expect(() => sut.execute(
      'invalid-appointment-id'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
