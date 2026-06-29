import { 
  CreateAppointmentDTO, 
  Appointment, 
  UpdateAppointmentDTO,
  DetailAppointmentDTO
} from "@shared/types/appointment"

export interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>
  update(data: Partial<UpdateAppointmentDTO>): Promise<Appointment>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Appointment | null>
  findByIdWithDetails(id: string): Promise<DetailAppointmentDTO | null>
  findManyByClientId(clientId: string): Promise<Appointment[] | null>
  findManyByOrderId(orderId: string): Promise<Appointment[] | null>
}
