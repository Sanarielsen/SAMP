import { AppointmentRepository } from "@/repositories/appointment-repository";
import { ClientRepository } from "@/repositories/client-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";


export class ListAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(clientId: string): Promise<Appointment[] | null> {
    
    const clientWillBeUsed = await this.clientRepository.findById(clientId)

    if (!clientWillBeUsed) {
      throw new ResourceNotFoundError()
    }

    return await this.appointmentRepository.findManyByClientId(clientId)
  }
}
