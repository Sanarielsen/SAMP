import { AppointmentRepository } from "@/repositories/appointment-repository"
import { OrderRepository } from "@/repositories/order-repository"
import { ClientRepository } from "@/repositories/client-repository"

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

import { 
  Appointment, 
  CreateAppointmentDTO 
} from "@shared/types/appointment"


export class PostAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    
    const client = await this.clientRepository.findById(data.clientId);

    if (!client) {
      throw new ResourceNotFoundError();
    }
    
    if (data.orderId) {
      const order = await this.orderRepository.findById(data.orderId)

      if (!order) {
        throw new ResourceNotFoundError();
      }
    }

    return await this.appointmentRepository.create(data)
  }
}