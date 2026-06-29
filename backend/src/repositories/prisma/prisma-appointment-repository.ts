import { prisma } from "@/lib/prisma";

import { AppointmentRepository } from "@/repositories/appointment-repository";

import { Appointment, AppoitmentItem, CreateAppointmentDTO, DetailAppointmentDTO, UpdateAppointmentDTO } from "@shared/types/appointment";


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

  async findManyByOrderId(orderId: string): Promise<Appointment[] | null> {
    return await prisma.clientAppointment.findMany({
      where: {
        orderId,
        deletedAt: null,
      },
    })
  }

  async findManyByUserIdAndRange(userId: string, howManyDays: number): Promise<AppoitmentItem[] | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userRole: true },
    })

    if (!user) return null

    const isAdmin = user.userRole?.name?.toUpperCase() === "ADMIN"

    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + Math.max(1, howManyDays - 1))
    endDate.setHours(23, 59, 59, 999)

    const appointments = await prisma.clientAppointment.findMany({
      where: {
        deletedAt: null,
        appointmentAt: {
          gte: startDate,
          lte: endDate,
        },
        ...(isAdmin
          ? {}
          : {
              client: {
                responsibleById: userId,
              },
            }),
      },
      include: {
        client: true,
        Order: {
          include: {
            orderType: true,
          },
        },
      },
      orderBy: {
        appointmentAt: "asc",
      },
    })

    return appointments.map((appointment) => ({
      id: appointment.id,
      description: appointment.description, 
      appointmentAt: appointment.appointmentAt,
      clientId: appointment.client.id,
      clientName:
        appointment.client?.tradeName ||
        appointment.client?.legalName ||
        "",
      orderTitle:
        appointment.Order?.orderType?.title ??
        appointment.Order?.description ??
        null,
    }))
  }
}