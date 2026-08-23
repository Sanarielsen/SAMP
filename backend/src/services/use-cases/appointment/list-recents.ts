import { AppointmentRepository } from "@/repositories/appointment";

import { AppoitmentItem } from "@shared/types/appointment";


export class ListRecentAppointmentsUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) {}

  async execute(userId: string, howManyDays: number): Promise<AppoitmentItem[] | null> {
    
    return await this.appointmentRepository.findManyByUserIdAndRange(userId, howManyDays)
  }
}
