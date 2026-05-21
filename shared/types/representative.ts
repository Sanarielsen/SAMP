export interface Representative {
  id: string

  clientId: string

  name: string
  nationality: string

  documentRG: string
  documentCPF: string

  titleJob: string
  roleJob: string

  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export interface CreateRepresentativeDTO {
  clientId: string

  name: string
  nationality: string

  documentRG: string
  documentCPF: string

  titleJob: string
  roleJob: string
}

export interface UpdateRepresentativeDTO {
  id: string

  clientId?: string

  name?: string
  nationality?: string

  documentRG?: string
  documentCPF?: string

  titleJob?: string
  roleJob?: string

  updatedAt?: Date
}

export interface RepresentativeDetailsDTO {
  id: string

  clientId: string

  name: string
  nationality: string

  documentRG: string
  documentCPF: string

  titleJob: string
  roleJob: string

  createdAt: Date
}

export interface RepresentativeOptionDTO {
  label: string
  value: string
}