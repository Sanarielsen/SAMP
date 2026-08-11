export type ImportedProcess = {
  id:       string
  clientId: string

  processNumber:      string
  processStatus:      string
  processMagazine:    string
  holder:             string
  brand:              string
  nature:             string 
  presentation:       string
  niceTitle:          string
  niceStatus:         string
  niceSpecification:  string

  filingDate:     Date | null
  grantDate:      Date | null
  expirationDate: Date | null

  createdByUser: string
  updatedByUser: string

  createdAt:  Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export type ImportedProcessCreateDTO = {
  userIdLogged:     string
  clientId:         string
  processNumber:    string
  processStatus:    string
  processMagazine:  string
  
  holder:             string
  brand:              string
  nature:             string 
  presentation:       string
  niceTitle:          string
  niceStatus:         string
  niceSpecification:  string

  filingDate:     Date | null
  grantDate:      Date | null
  expirationDate: Date | null
}

export type ImportedProcessUpdateDTO = {
  id:           string
  userIdLogged: string

  clientId?:          string
  processNumber?:     string
  processStatus?:     string
  processMagazine?:   string
  status?:            string
  holder?:            string
  brand?:             string
  nature?:            string 
  presentation?:      string
  niceTitle?:         string
  niceStatus?:        string
  niceSpecification?: string

  filingDate?:     Date | null
  grantDate?:      Date | null
  expirationDate?: Date | null
}

export type ImportedProcessWithDetails = {
  id: string

  clientId:         string
  clientName:       string
  clientLegalName:  string
  clientTradeName:  string
  clientTypeName:   string
  clientDocument:   string

  processNumber:      string
  processStatus:      string
  processMagazine:    string
  holder:             string
  brand:              string
  nature:             string 
  presentation:       string
  niceTitle:          string
  niceStatus:         string
  niceSpecification:  string

  filingDate:     Date | null
  grantDate:      Date | null
  expirationDate: Date | null

  createdByUser: string
  updatedByUser: string
  userName: string
  userRoleName: string
  userEmail: string

  createdAt:  Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}


export type ImportedProcessFromINPI = {
  pedidoNumber:         string
  processNumber:        string
  processMagazine:      string
  processStatus:        string
  holder:               string
  brand:                string
  nature:               string 
  presentation:         string
  niceTitle:            string
  niceStatus:           string
  niceSpecification:    string
  updatedAtByMagazine:  Date

  filingDate:     Date
  grantDate:      Date | null
  expirationDate: Date | null

  sourceEntireProcess:  string
}
