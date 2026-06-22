import { PrismaAppointmentRepository } from "@/repositories/prisma/prisma-appointment-repository";
import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { UpdateAppointmentUseCase } from "@/services/service-appointment/update";

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