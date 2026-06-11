import { randomUUID } from "crypto";

import { PaymentRepository } from "@/repositories/payment-repository";

import { 
  Payment,
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO
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

  createWithInstallments(data: CreatePaymentWithInstallmentsDTO): Promise<Payment> {
    throw new Error("Method not implemented.");
  }

  async findManyByOrderId(orderId: string): Promise<Payment[] | null> {
    const payments = this.items.filter(item => item.orderId = orderId)

    if (!payments) {
      return null
    }

    return payments
  }
}