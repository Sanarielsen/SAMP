import {
  CreatePaymentInstallmentDTO,
  PaymentInstallment,
  UpdatePaymentInstallmentDTO,
} from '@shared/types/paymentInstallments'

export interface PaymentInstallmentRepository {
  create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment>
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void>
  update(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment>
  updateInstallmentPaid(id: string, paidAt: Date | null, proofPaymentPath: string): Promise<PaymentInstallment>
  delete(id: string): Promise<PaymentInstallment>

  findById(id: string): Promise<PaymentInstallment | null>
  findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[]>
}