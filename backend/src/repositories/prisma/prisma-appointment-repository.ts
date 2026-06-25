import { prisma } from "@/lib/prisma";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { Appointment, CreateAppointmentDTO } from "@shared/types/appointment";


export class PrismaAppointmentRepository implements AppointmentRepository {
  async create(data: CreateAppointmentDTO): Promise<Appointment> {
    return await prisma.clientAppointment.create({
      data
    })
  }

  async delete(id: string): Promise<void> {
    prisma.order.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }
  
  async findById(id: string): Promise<Appointment | null> {
    return await prisma.clientAppointment.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyByClientId(clientId: string): Promise<Appointment[] | null> {
    return await prisma.clientAppointment.findMany({
      where: {
        clientId,
        deletedAt: null,
      },
    })
  }
}