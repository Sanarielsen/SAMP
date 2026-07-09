export type ProcessImported = {
  id:                         string
  processTypeId?:             string
  processNumber?:             string
  title:                      string
  titular?:                   string
  dispatchDescription?:       string   
  publishDate?:               Date
  grantingDate?:              Date
  dueDate?:                   Date
  depositDate?:               Date
  receiptDate?:               Date
  internationalRegistration?: string
  presentation?:              string
  nature?:                    string
  nominativeElement?:         string
  ncl?:                       string
  specification?:             string   
  sourceText?:                string   
  sourceFile?:                string
  sourcePage?:                number
  status?:                    string
  createdAt:                  Date
  updatedAt?:                 Date
  deletedAt?:                 Date
}

export type CreateProcessImportedDTO = {
  userId:         string
  categoryId:     string,
  numberMagazine: string,
  fileMagazine:   Buffer,
}

export type DetailsProcessImportedDTO = {
  id:               string, 
  processTypeId?:   string | null
  processTypeName?: string | null
  processNumber?:   string | null
  title:            string | null
  titular:          string | null
  createdAt:        Date
}

export type CreatedProcessImportedDTO = {
  processHistoricId:          string         
  processCategoryId:          string
  processTypeId?:             string
  processNumber:              string
  title:                      string
  titular?:                   string
  dispatchDescription?:       string   
  publishDate?:               Date
  grantingDate?:              Date
  dueDate?:                   Date
  depositDate?:               Date
  receiptDate?:               Date
  internationalRegistration?: string
  presentation?:              string
  nature?:                    string
  nominativeElement?:         string
  ncl?:                       string
  specification?:             string   
  sourceText?:                string   
  sourceFile?:                string
  sourcePage?:                number
  importedByUser:             string
  status?:                    string
}