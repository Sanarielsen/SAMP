export type PaymentMethod = {
  id: number,
  name: string,
  observation: string | null,
  order: number,

  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
}

export type PaymentMethodCreateDTO = {
  name: string,
  order: number,
  observation?: string | null,
}


export type PaymentMethodUpdateDTO = {
  id: number, 

  name?: string,
  observation?: string | null,
  order?: number,
}
