
import { AppointmentRepository } from "@/repositories/appointment-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";


export class GetAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) {}

  async execute(id: string): Promise<Appointment> {
    
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new ResourceNotFoundError();
    }

    return appointment
  }
}
