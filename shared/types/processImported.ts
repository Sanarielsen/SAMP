  export type ImportedProcess = {
    id:                string
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
    createdAt:      Date | null
  }

  export type ImportedProcessListWithDetails = ImportedProcess & {
    categoryName: string
    typeName: string
    magazineNumber: string
  };

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

export type ImportedProcessFilter = {
  categoryId: string,
  typeId?: string,
  historyId?: string
}

export interface ImportedProcessFromINPI {
  codPedido: string;
  processNumber: string;
  holder: string;
  brand: string;
  status: string;
  class: string;
  sourceBody: string;
}

//TODO: Verify if all is really can be null or not.
export interface ImportedProcessDetailFromINPI {
  processNumber: string | null;
  status: string | null
  holder: string | null;
  brand: string | null;
  nature: string | null;
  presentation: string | null;
  specification: string | null;
  depositDate: string | null;
  grantDate: string | null;
  expirationDate: string | null;
  sourceEntireProcess: string | null
}