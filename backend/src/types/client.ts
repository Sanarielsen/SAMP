export type CreateClientDTO = {
  id?: string,
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
  isActivated: boolean
  createdBy: string
  responsibleBy: string
}