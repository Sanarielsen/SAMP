import { PaymentMethodRepository } from "@/repositories/payment-method";

import { 
  PaymentMethod,
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO, 
} from "@shared/types/paymentMethod";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryPaymentMethodRepository implements PaymentMethodRepository {
  public items: PaymentMethod[] = []

  async create(data: PaymentMethodCreateDTO): Promise<PaymentMethod> {

    const id = this.items.length > 0
      ? Math.max(...this.items.map(item => item.id)) + 1
      : 1;
        
    const paymentMethod: PaymentMethod = {
      ...data,
      id,
      observation: data.observation ?? null,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    this.items.push(paymentMethod)

    return paymentMethod
  }

  async update(data: PaymentMethodUpdateDTO): Promise<PaymentMethod> {

    const paymentMethod = this.items.findIndex(paymentMethod => {
      return paymentMethod.id === data.id
    })

    const updatedPaymentMethod = {
      ...this.items[paymentMethod],
      ...data,
      updatedAt: new Date(),
    }

    this.items[paymentMethod] = updatedPaymentMethod

    return updatedPaymentMethod
  }

  async delete(id: number): Promise<void> {    
    const paymentMethodIndex = this.items.findIndex(method => {
      return method.id === id
    })

    const disabledPaymentMethod = {
      ...this.items[paymentMethodIndex],
      deletedAt: new Date(),
    }

    this.items[paymentMethodIndex] = disabledPaymentMethod
  }
  
  async findById(id: number): Promise<PaymentMethod | null> {
    const paymentMethod = this.items.find(method => method.id === id)

    if (!paymentMethod) {
      return null
    }
    
    return paymentMethod
  }

  async findManyActive(): Promise<PaymentMethod[]> {
    return this.items.filter(methods => methods.deletedAt === null)
  }

  async findManyOptions(): Promise<OptionsControlledBox[]> {
    const paymentMethods = this.items.filter(methods => 
      methods.deletedAt === null
    )

    return paymentMethods.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }
}