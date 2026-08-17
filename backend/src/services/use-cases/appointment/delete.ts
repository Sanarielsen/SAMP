import { AppointmentRepository } from "@/repositories/appointment-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeleteAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) {}

  async execute(id: string): Promise<void> {
    
    const appointments = await this.appointmentRepository.findById(id)
    
    if (!appointments) {
      throw new ResourceNotFoundError()
    }

    await this.appointmentRepository.delete(id)
  }
}