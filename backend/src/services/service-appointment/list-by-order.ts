import { AppointmentRepository } from "@/repositories/appointment-repository";
import { ClientRepository } from "@/repositories/client-repository";
import { OrderRepository } from "@/repositories/order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Appointment } from "@shared/types/appointment";


export class ListAppointmentsByOrderUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute(orderId: string): Promise<Appointment[] | null> {
    
    const orderWillBeUsed = await this.orderRepository.findById(orderId)

    if (!orderWillBeUsed) {
      throw new ResourceNotFoundError()
    }

    return await this.appointmentRepository.findManyByOrderId(orderWillBeUsed.id)
  }
}
