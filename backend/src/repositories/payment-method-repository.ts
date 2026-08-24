import {
  PaymentMethod,
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
} from '@shared/types/paymentMethod'
import { OptionsControlledBox } from '@shared/types/values'


export interface PaymentMethodRepository {
  create(data: PaymentMethodCreateDTO): Promise<PaymentMethod>
  update(data: PaymentMethodUpdateDTO): Promise<PaymentMethod>
  delete(id: number): Promise<void>

  findById(id: number): Promise<PaymentMethod | null>
  findManyActive(): Promise<PaymentMethod[]>
  findManyOptions(): Promise<OptionsControlledBox[]>
}