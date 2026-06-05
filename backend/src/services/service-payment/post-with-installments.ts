import { OrderRepository } from "@/repositories/order-repository"
import { PaymentRepository } from "@/repositories/payment-repository"
import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository"

import { InvalidResourceError } from "@/services/errors/invalid-resource-error"

import { CreatePaymentWithInstallmentsDTO } from "@shared/types/payment"

interface PostPaymentWithInstallmentsUseCasePayload {
  idOrder: string,
  newPayment: CreatePaymentWithInstallmentsDTO
}

export class PostPaymentWithInstallmentsUseCase {

  constructor(
    private paymentRepository: PaymentRepository,
    private installmentRepository: PaymentInstallmentRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute({
    idOrder, newPayment
  }: PostPaymentWithInstallmentsUseCasePayload) {

    const order =
      await this.orderRepository.findById(
        idOrder,
      )

    if (!order || order.deletedAt) {
      throw new InvalidResourceError()
    }

    const payment =
      await this.paymentRepository.create({
        orderId: idOrder,

        totalInstallments:
          newPayment.totalInstallments,

        observation:
          newPayment.observation ?? null,

        firstDueDate:
          newPayment.firstDueDate
      })
  
    const baseAmount = Math.floor(
      newPayment.totalAmountInCents /
      newPayment.totalInstallments,
    )

    const remainder = newPayment.totalAmountInCents % newPayment.totalInstallments
      
    const installments = Array.from({
        length: newPayment.totalInstallments,
      }, (_, index) => {
          const dueDate = new Date(newPayment.firstDueDate)

          dueDate.setMonth(dueDate.getMonth() + index)

          const amountInCents = index === 0 ? 
            baseAmount + remainder : baseAmount

          return {
            paymentId: payment.id,
            installment: index + 1,
            amountInCents,
            methodId: newPayment.methodId,
            dueDate,
            observation: newPayment.observation ?? null,
          }
        },
      )

    await this.installmentRepository.createMany(installments)

    return {
      id: payment.id,
    }
  }
}