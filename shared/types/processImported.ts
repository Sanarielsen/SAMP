export type ProcessImported = {
  id:                string
  processHistoricId: string
  processCategoryId: string
  processTypeId:     string

  processNumber:                    string
  holder:                           string        
  dispatchDetails?:                 string | null
  attorney?:                        string| null
  presentation?:                    string| null
  nature?:                          string| null
  markName?:                        string | null
  ncl?:                             string| null
  specification?:                   string| null
  translatedSpecification?:         string| null
  internationalRegistrationNumber?: string| null
  cfe?:                             string | null 

  status:         string
  sourceText:     string
  sourcePage:     number
  importedByUser: string
  depositDate?:    Date
  receivedDate?:  Date | null
  grantDate?:     Date | null
  createdAt:      Date | null
}

export type CreateProcessImportedDTO = {
  userId:         string
  categoryId:     string,
  numberMagazine: string,
  fileMagazine:   Buffer,
}

export type DetailsProcessImportedDTO = {
  id:               string, 
  processTypeId:    string
  processTypeName:  string
  processNumber:    string
  holder:           string
  createdAt:        Date
}

export type CreatedProcessImportedDTO = {
  processHistoricId: string
  processCategoryId: string
  processTypeId:     string

  processNumber:                    string
  holder:                           string        
  dispatchDetails?:                 string | null
  attorney?:                        string | null
  presentation?:                    string | null
  nature?:                          string | null
  markName?:                        string | null 
  ncl?:                             string | null
  specification?:                   string | null
  translatedSpecification?:         string | null
  internationalRegistrationNumber?: string | null
  cfe?:                             string | null  

  status:         string
  sourceText:     string
  sourcePage:     number
  importedByUser: string
  depositDate?:   Date | null
  receivedDate?:  Date | null
  grantDate?:     Date | null
}