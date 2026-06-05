import { randomUUID } from "crypto";

import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";

import { 
  CreatePaymentInstallmentDTO, 
  UpdatePaymentInstallmentDTO,
  PaymentInstallment
} from "@shared/types/paymentInstallments";


export class InMemoryPaymentInstallmentsRepository implements PaymentInstallmentRepository {
  public items: PaymentInstallment[] = []

  async create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment> {
    const paymentInstallment: PaymentInstallment = {
      ...data,
      id: randomUUID(),
      paidAt: null,
      receiptFilePath: null,
      observation: null,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    this.items.push(paymentInstallment)

    return paymentInstallment
  }
  
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment> {
    const paymentInstallmentIndex =
      this.items.findIndex(
        (item) => item.id === data.id
      )

    const paymentInstallment = this.items[paymentInstallmentIndex]

    const updatedPaymentInstallment = {
      ...paymentInstallment,
      ...data,

      updatedAt: new Date(),
    }

    this.items[paymentInstallmentIndex] = updatedPaymentInstallment

    return updatedPaymentInstallment
  }

  async updateInstallmentPaid(id: string, paidAt: Date | null): Promise<PaymentInstallment> {
    const paymentInstallmentIndex =
      this.items.findIndex(
        (item) => item.id === id
      )

    const paymentInstallment = this.items[paymentInstallmentIndex]

    const updatedPaymentInstallment = {
      ...paymentInstallment,
      paidAt,

      updatedAt: new Date(),
    }

    this.items[paymentInstallmentIndex] = updatedPaymentInstallment

    return updatedPaymentInstallment
  }

  async delete(id: string): Promise<PaymentInstallment> {    
    const paymentInstallmentIndex = this.items.findIndex(method => {
      return method.id === id
    })

    const paymentInstallmentMethod = {
      ...this.items[paymentInstallmentIndex],
      deletedAt: new Date(),
    }

    this.items[paymentInstallmentIndex] = paymentInstallmentMethod

    return paymentInstallmentMethod
  }

  async findById(id: string): Promise<PaymentInstallment | null> {
    const paymentInstallment = this.items.find(paymentInstallment => paymentInstallment.id == id)

    if (!paymentInstallment) {
      return null
    }

    return paymentInstallment
  }

  async findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[]> {
    
    return this.items.filter(payment => payment.id = paymentId)
  }

}