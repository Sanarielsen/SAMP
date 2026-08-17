export interface OrderType {
  id:           number
  title:        string
  description:  string
  order:        number
  observation:  string | null
  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

export interface OrderTypeCreateDTO {
  title:          string
  description:    string
  order:         number
  observation?:   string | null
}

export interface OrderTypeUpdateDTO {
  id:             number
  title?:         string
  description?:   string
  order?:         number
  observation?:   string | null
}