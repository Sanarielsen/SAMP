import { randomUUID } from "crypto";

import { PaymentRepository } from "@/repositories/payment-repository";

import { 
  Payment,
  CreatePaymentDTO 
} from "@shared/types/payment";


export class InMemoryPaymentRepository implements PaymentRepository {
  public items: Payment[] = []

  async create(data: CreatePaymentDTO): Promise<Payment> {

    const payment: Payment = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    this.items.push(payment)

    return payment
  }
}