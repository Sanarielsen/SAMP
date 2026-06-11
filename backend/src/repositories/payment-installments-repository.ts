import {
  CreatePaymentInstallmentDTO,
  PaymentInstallment,
} from '@shared/types/paymentInstallments'

export interface PaymentInstallmentRepository {
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void>
  findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[] | null>
}