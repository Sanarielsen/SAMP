import { OrderRepository } from "@/repositories/order-repository"
import { PaymentRepository } from "@/repositories/payment-repository"
import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository"

import { InvalidResourceError } from "@/services/errors/invalid-resource-error"

import { CreatePaymentWithInstallmentsDTO } from "@shared/types/payment"

export class PostPaymentWithInstallmentsUseCase {

  constructor(
    private paymentRepository: PaymentRepository,
    private installmentRepository: PaymentInstallmentRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(data: CreatePaymentWithInstallmentsDTO) {

    const order =
      await this.orderRepository.findById(
        data.orderId,
      )

    if (!order || order.deletedAt) {
      throw new InvalidResourceError()
    }

    const payment =
      await this.paymentRepository.create({
        orderId: data.orderId,

        totalInstallments:
          data.totalInstallments,

        totalAmountInCents:
          data.totalAmountInCents,

        description:
          data.description,

        observation:
          data.observation ?? null,

        firstDueDate:
          data.firstDueDate
      })
  
    const baseAmount = Math.floor(
      data.totalAmountInCents /
      data.totalInstallments,
    )

    const remainder = data.totalAmountInCents % data.totalInstallments
      
    const installments = Array.from({
        length: data.totalInstallments,
      }, (_, index) => {
          const dueDate = new Date(data.firstDueDate)

          dueDate.setMonth(dueDate.getMonth() + index)

          const amountInCents = index === 0 ? 
            baseAmount + remainder : baseAmount

          return {
            paymentId: payment.id,
            installment: index + 1,
            amountInCents,
            method: data.method,
            dueDate,
            observation: data.observation ?? null,
          }
        },
      )

    await this.installmentRepository.createMany(installments)

    return {
      id: payment.id,
    }
  }
}