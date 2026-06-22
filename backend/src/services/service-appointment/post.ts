import { AppointmentRepository } from "@/repositories/appointment-repository"
import { OrderRepository } from "@/repositories/order-repository"
import { ClientRepository } from "@/repositories/client-repository"

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

import { 
  Appointment, 
  CreateAppointmentDTO 
} from "@shared/types/appointment"
import { UserRepository } from "@/repositories/user-repository"
import { UserNotResponsibleForClientError } from "../errors/non-responsable-user"

interface PostAppointmentUseCasePayload {
  idUser: string
  data: CreateAppointmentDTO
}

export class PostAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientRepository,
    private userRepository: UserRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute({
    idUser, 
    data
  }: PostAppointmentUseCasePayload): Promise<Appointment> {
    
    const client = await this.clientRepository.findById(data.clientId);

    if (!client) {
      throw new ResourceNotFoundError();
    }

    const user = await this.userRepository.findById(idUser)

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (client.responsibleById !== user.id) {
      throw new UserNotResponsibleForClientError();
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