import {
  PaymentInstallment,
  PaymentInstallmentObservation,
  PaymentInstallmentProof,
  CreatePaymentInstallmentDTO,
  UpdatePaymentInstallmentDTO,
} from '@shared/types/paymentInstallment'

export interface PaymentInstallmentRepository {
  create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment>
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void>

  update(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment>
  updateInstallmentPaid(data: PaymentInstallmentProof): Promise<PaymentInstallment>
  updateInstallmenObservation( data: PaymentInstallmentObservation): Promise<PaymentInstallment>
  
  delete(id: string): Promise<PaymentInstallment>

  findById(id: string): Promise<PaymentInstallment | null>
  findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[]>
}