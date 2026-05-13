export interface Client {
  legalName: string
  tradeName: string
  type: number
  protocol: string
  dataFundation: Date
  locationAddress: string
  correspondenceAddress: string
  nameContact: string
  numberContact: string
  createdAt: Date
  updatedAt: Date
  isActivated: boolean
}

export interface ClientDetails extends Client {
  id: string,
}