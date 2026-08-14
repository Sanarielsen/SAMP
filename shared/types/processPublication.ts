export type ProcessPublication = {
  id: string

  importedProcessId: string

  magazineNumber:   string
  publicationDate:  Date
  dispatch:         string
  certificate:      string | null
  description:      string | null
  complement:       string | null

  createdByUser: string
  updatedByUser: string
  
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type ProcessPublicationCreateDTO = {
  importedProcessId: string

  magazineNumber:  string
  publicationDate:  Date
  dispatch:         string
  certificate:      string | null
  description:      string | null
  complement:        string | null
  createdByUser:    string
}

export type ProcessPublicationCreateFromINPIDTO = {
  importedProcessId:  string
  createdByUser:      string

  publications: ProcessPublicationFromINPI[]
}

export type ProcessPublicationUpdateDTO = {
  id: string
  updatedByUser:    string

  importedProcessId?: string
  magazineNumber?:  string
  publicationDate?:  Date
  dispatch?:         string
  certificate?:      string
  description?:      string
  complement?:       string
}

export type ProcessPublicationDetails = {
  id: string

  importedProcessId: string
  processHolder: string
  processBrand: string

  magazineNumber:   string
  publicationDate:  Date
  dispatch:         string
  certificate:      string | null
  description:      string | null
  complement:       string | null

  createdByUser: string
  updatedByUser: string
  createdBy: string
  updatedBy: string
  
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type ProcessPublicationFromINPI = {
  magazineNumber: string //rpi
  publicationDate: string //dataRPI
  dispatch: string //despacho
  certificate: string //certificado
  description: string //inteiroTeor
  complement: string //complementoDespacho
  entireSource?: string //raw
}

