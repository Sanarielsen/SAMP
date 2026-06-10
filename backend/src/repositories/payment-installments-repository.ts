import {
  CreatePaymentInstallmentDTO,
} from '@shared/types/paymentInstallments'

export interface PaymentInstallmentRepository {
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void>
}