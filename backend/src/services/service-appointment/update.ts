import { AppointmentRepository } from "@/repositories/appointment-repository";
import { ClientRepository } from "@/repositories/client-repository";
import { OrderRepository } from "@/repositories/order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  Appointment, 
  UpdateAppointmentDTO 
} from "@shared/types/appointment";


export class UpdateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(data: UpdateAppointmentDTO): Promise<Appointment> {

    if (data.clientId) {

      const client = await this.clientRepository.findById(data.clientId)

      if (!client) {
        throw new ResourceNotFoundError()
      }
    }

    if (data.orderId) {
      const order = await this.orderRepository.findById(data.orderId)

      if (!order) {
        throw new ResourceNotFoundError()
      }
    }

    const appointment = await this.appointmentRepository.findById(data.id)

    if (!appointment) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.appointmentRepository.update(data)

    return updatedClient
  }
}