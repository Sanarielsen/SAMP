import { randomUUID } from "node:crypto";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { 
  Appointment, 
  CreateAppointmentDTO, 
  DetailAppointmentDTO, 
  UpdateAppointmentDTO 
} from "@shared/types/appointment";


export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = []
  
  async create(data: CreateAppointmentDTO) {
    const appointment: Appointment = {
      ...data,
      id: data.id ?? randomUUID(),
      createdAt: new Date(Date.now())
    }
    
    this.items.push(appointment)
    
    return appointment
  }
  
  async update(data: Partial<UpdateAppointmentDTO>): Promise<Appointment> {
    const appointmentIndex = this.items.findIndex(appointment => {
      return appointment.id === data.id
    })
    
    const updatedAppointment = {
      ...this.items[appointmentIndex],
      ...data,
      updatedAt: new Date(),
    }
    
    this.items[appointmentIndex] = updatedAppointment
    
    return updatedAppointment
  }
  
  async delete(id: string): Promise<void> {
    const appointmentIndex = this.items.findIndex(appointment => {
      return appointment.id === id
    })
    
    const disabledAppointment = {
      ...this.items[appointmentIndex],
      deletedAt: new Date(),
    }

    this.items[appointmentIndex] = disabledAppointment
  }
  
  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.items.find(item => item.id == id)
    
    if (!appointment) {
      return null
    }
    
    return appointment
  }
  
  findByIdWithDetails(id: string): Promise<DetailAppointmentDTO | null> {
    throw new Error("Method not implemented.");
  }
  
  async findManyByClientId(clientId: string): Promise<Appointment[] | null> {
    return this.items.filter( (appointment) => 
      appointment.clientId == clientId && 
      appointment.deletedAt === null
    )
  }

  async findManyByOrderId(orderId: string): Promise<Appointment[] | null> {
    return this.items.filter( (appointment) => 
      appointment.orderId == orderId && 
      appointment.deletedAt === null
    )
  }
}
