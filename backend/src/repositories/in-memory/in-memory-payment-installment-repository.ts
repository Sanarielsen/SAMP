import { randomUUID } from "crypto";

import { PaymentRepository } from "@/repositories/payment-repository";

import { 
  Payment,
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO
} from "@shared/types/payment";
import { PaymentInstallmentRepository } from "../payment-installments-repository";
import { CreatePaymentInstallmentDTO, PaymentInstallment } from "@shared/types/paymentInstallments";


export class InMemoryPaymentInstallmentsRepository implements PaymentInstallmentRepository {
  public items: PaymentInstallment[] = []
  
  createMany(data: CreatePaymentInstallmentDTO[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[] | null> {
    
    const payment = this.items.filter(payment => payment.id = paymentId)

    if (!payment) {
      return null
    }

    return payment
  }

  
  
}