export interface Order {
  id:           string
  clientId:     string
  orderTypeId:  number
  observation:  string | null
  eventDate:    Date
  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

export interface CreateOrderDTO {
  clientId:     string
  orderTypeId:  number
  description:  string
  observation:  string | null
  eventDate:    Date
}

export interface UpdateOrderDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  description?: string
  observation?: string
  eventDate?:   Date
}

export interface OrderDetailDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  description?: string
  observation?: string
  eventDate?:   Date

  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

export interface OrderDetailTable {
  id: string,
  orderTypeId: number,
  orderTypeTitle: string,
  description: string | null,
  eventDate: Date,
  clientId: string,
  clientName: string,
}