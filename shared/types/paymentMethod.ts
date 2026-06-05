export type PaymentMethod = {
  id: string,
  name: string,
  observation: string | null,
  order: number,

  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
}

export type CreatePaymentMethodDTO = {
  name: string,
  observation?: string | null,
  order: number,
}


export type UpdatePaymentMethodDTO = {
  id: string, 

  name?: string,
  observation?: string | null,
  order?: number,
}