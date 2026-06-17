import { CreatePaymentMethodDTO, PaymentMethod } from "@shared/types/paymentMethod";
import { PaymentMethodRepository } from "../payment-method-repository";


export class InMemoryPaymentMethodsRepository implements PaymentMethodRepository {
  public items: PaymentMethod[] = []

  async create(data: CreatePaymentMethodDTO): Promise<PaymentMethod> {
        
    const paymentMethod: PaymentMethod = {
      ...data,
      id: crypto.randomUUID(),
      observation: data.observation ?? null,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    this.items.push(paymentMethod)

    return paymentMethod
  }

  async delete(id: string): Promise<PaymentMethod> {    
    const paymentMethodIndex = this.items.findIndex(method => {
      return method.id === id
    })

    const disabledPaymentMethod = {
      ...this.items[paymentMethodIndex],
      deletedAt: new Date(),
    }

    this.items[paymentMethodIndex] = disabledPaymentMethod

    return disabledPaymentMethod
  }
  
  async findById(id: string): Promise<PaymentMethod | null> {
    const paymentMethod = this.items.find(method => method.id == id)

    if (!paymentMethod) {
      return null
    }
    
    return paymentMethod
  }

  async findManyActive(): Promise<PaymentMethod[]> {
    return this.items.filter(methods => methods.deletedAt === null)
  }
}