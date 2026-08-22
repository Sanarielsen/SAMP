import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { DeleteAppointmentUseCase } from "./delete";

import { makeAppointment } from "@/services/factories/appointment/make-entity";
import { InMemoryAppointmentRepository } from "@/repositories/in-memory/in-memory-appointment-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let appointmentRepository: InMemoryAppointmentRepository
let sut: DeleteAppointmentUseCase

describe('Delete Appointment Use Case', () => {
  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository
    sut = new DeleteAppointmentUseCase(appointmentRepository)
  })

  it('should delete a valid appointment', async () => {
    const newAppointment = await makeAppointment(appointmentRepository)
    await sut.execute(newAppointment.id)

    expect(newAppointment.deletedAt).not.toBeNull()
  })

  it('should not delete an invalid appointment', async () => {
    await expect(() => sut.execute(
      'invalid-appointment-id'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})