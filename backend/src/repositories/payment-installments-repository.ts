import {
  CreatePaymentInstallmentDTO,
  PaymentInstallment,
  UpdatePaymentInstallmentDTO,
} from '@shared/types/paymentInstallments'

export interface PaymentInstallmentRepository {
  create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment>
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void>
  update(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment>

  findById(id: string): Promise<PaymentInstallment | null>
  findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[]>
}