export interface PaymentInstallment {
  id: string

  paymentId: string
  methodId: number
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
  methodId:         number

  observation?:      string | null
}

export type UpdatePaymentInstallmentDTO = {
  id: string

  methodId?:        number
  installment?:     number
  amountInCents?:   number

  dueDate?:         Date
  paidAt?:          Date | null

  receiptFilePath?: string | null
  observation?:     string | null
}

export type PaymentInstallmentProof = {
  id: string
  paidAt: Date | null
}

export type PaymentInstallmentObservation = {
  id: string
  observation: string | null
}