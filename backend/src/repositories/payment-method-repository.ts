import { UpdatePaymentInstallmentDTO } from '@shared/types/paymentInstallments'
import {
  CreatePaymentMethodDTO,
  PaymentMethod
} from '@shared/types/paymentMethod'

export interface PaymentMethodRepository {
  create(data: CreatePaymentMethodDTO): Promise<PaymentMethod>
  delete(id: string): Promise<PaymentMethod>

  findById(id: string): Promise<PaymentMethod | null>
  findManyActive(): Promise<PaymentMethod[]>
}