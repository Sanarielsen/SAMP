import { 
  CreateAppointmentDTO, 
  Appointment 
} from "@shared/types/appointment"

export interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>
  findById(id: string): Promise<Appointment | null>
}
