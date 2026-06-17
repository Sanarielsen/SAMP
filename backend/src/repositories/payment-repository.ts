import {
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO, 
  Payment,
  PaymentDetailDTO
} from "@shared/types/payment"

export interface PaymentRepository {
  create(data: CreatePaymentDTO): Promise<Payment>
  createWithInstallments(data: CreatePaymentWithInstallmentsDTO): Promise<Payment>
  findById(id: string): Promise<Payment | null>
  findManyByOrderId(orderId: string): Promise<PaymentDetailDTO[] | null>
}