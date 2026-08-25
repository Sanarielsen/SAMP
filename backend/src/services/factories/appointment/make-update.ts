import { PrismaAppointmentRepository } from "@/repositories/prisma/appointment";
import { PrismaClientRepository } from "@/repositories/prisma/client";
import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { UpdateAppointmentUseCase } from "@/services/use-cases/appointment/update";

export function makeUpdateAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository();
  const clientRepository = new PrismaClientRepository();
  const orderRepository = new PrismaOrderRepository();
  const useCase = new UpdateAppointmentUseCase(
    appointmentRepository,
    clientRepository,
    orderRepository
  );
  
  return useCase
}