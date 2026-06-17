import type { PaymentInstallment } from "./paymentInstallments"

export type Payment = {
  id: string
  
  orderId:            string
  totalInstallments:  number
  totalAmountInCents?: number | null
  observation:        string | null
  firstDueDate:       Date

  createdAt:  Date
  updatedAt:  Date | null
  deletedAt:  Date | null
}

export type CreatePaymentDTO = {
  orderId:            string
  totalInstallments:  number
  observation?:       string | null
  firstDueDate:       Date
}

export type CreatePaymentWithInstallmentsDTO = {
  orderId:            string
  totalInstallments:  number
  totalAmountInCents: number
  firstDueDate:       Date
  methodId:           string
  observation?:       string | null
}

export type PaymentDetailDTO = {
  id: string
  totalInstallments:  number
  totalAmountInCents: number
  lastDueDate:        Date | null
  
  observation?:       string | null

  installments:       PaymentInstallment[]

  createdAt:  Date
  updatedAt:  Date | null
  deletedAt:  Date | null
}