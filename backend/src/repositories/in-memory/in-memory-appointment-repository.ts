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

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.items.find(item => item.id == id)

    if (!appointment) {
      return null
    }

    return appointment
  }
}
