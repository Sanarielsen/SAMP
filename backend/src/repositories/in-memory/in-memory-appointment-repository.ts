import { randomUUID } from "node:crypto";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { Appointment, CreateAppointmentDTO } from "@shared/types/appointment";


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

  async findManyByClientId(clientId: string): Promise<Appointment[] | null> {
    return this.items.filter( (appointment) => 
      appointment.clientId == clientId && 
      appointment.deletedAt === null
    )
  }
}
