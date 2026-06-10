import {
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO, 
  Payment
} from "@shared/types/payment"

export interface PaymentRepository {
  create(data: CreatePaymentDTO): Promise<Payment>
  createWithInstallments(data: CreatePaymentWithInstallmentsDTO): Promise<Payment>
}