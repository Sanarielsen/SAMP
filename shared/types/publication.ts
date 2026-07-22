export type Publication = {
  id:                string
  processTypeId:     string
  clientId:          string

  processNumber: string
  holder:        string
  brand:         string
  nature:        string
  presentation:  string
  specification: string
 
  publicationDate: Date | null
  depositDate:     Date | null
  grantDate:       Date | null

  createdAt:   Date 
  updatedAt:   Date | null
  deletedAt:   Date | null
}

export type CreatePublicationDTO = {
  processTypeId:     string
  clientId:          string

  processNumber: string
  holder:        string
  brand:         string
  nature:        string
  presentation:  string
  specification: string
 
  publicationDate: Date | null
  depositDate:     Date | null 
  grantDate:       Date | null
}

export type CreatePublicationTransferImportedProcessDTO = {
  clientId:          string
  importedProcessId: string
}

export type PublicationDetails = {
  id: string
  
  processTypeId:     string
  processTypeName:   string
  processTypeSlug:   string

  clientId:       string
  clientName:     string
  clientProtocol: string

  processNumber: string
  holder:        string
  brand:         string
  nature:        string
  presentation:  string
  specification: string
 
  publicationDate: Date | null
  depositDate:     Date | null
  grantDate:       Date | null

  createdAt:   Date 
  updatedAt:   Date | null
  deletedAt:   Date | null
}