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
  observation:  string | null
  eventDate:    Date
}

export interface UpdateOrderDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  observation?: string
  eventDate?:   Date
}

export interface OrderDetailDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  observation?: string
  eventDate?:   Date

  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}