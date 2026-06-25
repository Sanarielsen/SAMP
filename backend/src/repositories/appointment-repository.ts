import { 
  CreateAppointmentDTO, 
  Appointment 
} from "@shared/types/appointment"

export interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Appointment | null>
  findManyByClientId(clientId: string): Promise<Appointment[] | null>
}
