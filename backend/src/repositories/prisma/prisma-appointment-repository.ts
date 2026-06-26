import { prisma } from "@/lib/prisma";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { Appointment, CreateAppointmentDTO, DetailAppointmentDTO, UpdateAppointmentDTO } from "@shared/types/appointment";


export class PrismaAppointmentRepository implements AppointmentRepository {
  async create(data: CreateAppointmentDTO): Promise<Appointment> {
    return await prisma.clientAppointment.create({
      data
    })
  }
  
  update(data: Partial<UpdateAppointmentDTO>): Promise<Appointment> {
    return prisma.clientAppointment.update({
      where: {
        id: data.id
      },
      data: {
        ...data,
        updatedAt: new Date(Date.now())
      }
    })
  }
  
  async delete(id: string): Promise<void> {
    await prisma.clientAppointment.update({
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
  
  async findByIdWithDetails(id: string): Promise<DetailAppointmentDTO | null> {
    const appointmentWithDetails = await prisma.clientAppointment.findUnique({
      where: {
        id,
      },
      include: {
        Order: {
          include: {
            orderType: true
          }
        },
        client: true,
      }
    })

    if (!appointmentWithDetails) {
      return null
    }

    return {
      description: appointmentWithDetails.description,
      appointmentAt: String(appointmentWithDetails.appointmentAt),
      nameClient: appointmentWithDetails.client.legalName + ' - ' + appointmentWithDetails.client.tradeName,
      titleOrder: appointmentWithDetails.Order?.orderType.title,
      createdAt: appointmentWithDetails.createdAt,
      updatedAt: appointmentWithDetails.updatedAt
    }
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