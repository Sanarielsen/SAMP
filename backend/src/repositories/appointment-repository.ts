import { 
  CreateAppointmentDTO, 
  Appointment, 
  UpdateAppointmentDTO
} from "@shared/types/appointment"

export interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>
  update(data: Partial<UpdateAppointmentDTO>): Promise<Appointment>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Appointment | null>
  findManyByClientId(clientId: string): Promise<Appointment[] | null>
}
