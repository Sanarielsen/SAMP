import { randomUUID } from "crypto";

import { PaymentRepository } from "@/repositories/payment-repository";

import { 
  Payment,
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO
} from "@shared/types/payment";
import { PaymentInstallmentRepository } from "../payment-installments-repository";
import { CreatePaymentInstallmentDTO, PaymentInstallment, UpdatePaymentInstallmentDTO } from "@shared/types/paymentInstallments";


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