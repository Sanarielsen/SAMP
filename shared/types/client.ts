export interface CreateClientDTO {
  id?: string
  legalName: string
  tradeName: string
  type: number
  protocol: string
  dataFundation: Date
  locationAddress: string
  correspondenceAddress: string
  nameContact: string
  numberContact: string
  isActivated: boolean
  createdById: string,
  responsibleById: string,
  createdAt: Date
}


export interface ClientDetailDTO {
  id: string
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