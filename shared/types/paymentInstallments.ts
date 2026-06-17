export interface PaymentInstallment {
  id: string

  paymentId: string
  methodId: string
  installment: number
  amountInCents: number

  dueDate: Date
  paidAt: Date | null

  receiptFilePath: string | null
  observation:     string | null

  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type CreatePaymentInstallmentDTO = {
  paymentId:        string
  installment:      number
  amountInCents:    number
  dueDate:          Date
  methodId:           string

  observation?:      string | null
}

export type UpdatePaymentInstallmentDTO = {
  id: string

  methodId?:        string
  installment?:     number
  amountInCents?:   number

  dueDate?:         Date
  paidAt?:          Date | null

  receiptFilePath?: string | null
  observation?:     string | null
}