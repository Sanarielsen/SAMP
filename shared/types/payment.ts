export type Payment = {
  id: string
  
  orderId:            string
  totalInstallments:  number
  observation:        string | null
  firstDueDate:       Date

  createdAt:  Date
  updatedAt:  Date | null
  deletedAt:  Date | null
}

export type CreatePaymentDTO = {
  orderId:            string
  totalInstallments:  number
  totalAmountInCents: number
  observation?:       string | null
  firstDueDate:       Date
}

export type CreatePaymentWithInstallmentsDTO = {
  totalInstallments:  number
  totalAmountInCents: number
  firstDueDate:       Date
  method:             string
  observation?:       string | null
}

export type PaymentDetailDTO = {
  id: string
  totalInstallments:  number
  totalAmountInCents: number
}