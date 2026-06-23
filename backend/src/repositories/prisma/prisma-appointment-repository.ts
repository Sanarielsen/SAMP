import { prisma } from "@/lib/prisma";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { Appointment, CreateAppointmentDTO } from "@shared/types/appointment";


export class PrismaAppointmentRepository implements AppointmentRepository {
  async create(data: CreateAppointmentDTO): Promise<Appointment> {
    return await prisma.clientAppointment.create({
      data
    })
  }
  
  async findById(id: string): Promise<Appointment | null> {
    return await prisma.clientAppointment.findUnique({
      where: {
        id,
      },
    })
  }

}