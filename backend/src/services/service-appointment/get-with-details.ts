
import { AppointmentRepository } from "@/repositories/appointment-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment, DetailAppointmentDTO } from "@shared/types/appointment";


export class GetWithDetailsAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) {}

  async execute(id: string): Promise<DetailAppointmentDTO | null> {
    
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new ResourceNotFoundError();
    }

    const appointmentDetails = await this.appointmentRepository.findByIdWithDetails(id);

    return appointmentDetails
  }
}
