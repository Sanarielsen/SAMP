export type Process = {
  
}

export type CreateProcessImportedDTO = {
  userId:         string
  categoryId:     string,
  numberMagazine: string,
  fileMagazine?:   Buffer | null
}

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