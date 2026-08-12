export type ProcessPublication = {
  id: string

  importedProcessId: string

  processMagazine: string
  publicationDate: Date
  dispatch: string
  certificate?: string
  description?: string
  complement?: string

  createdByUser: string
  updatedByUser: string
  
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProcessPublicationCreateDTO = {
  importedProcessId: string

  processMagazine:  string
  publicationDate:  Date
  dispatch:         string
  certificate?:      string
  description?:      string
  complement?:       string
  createdByUser:    string
}

export type ProcessPublicationUpdateDTO = {
  id: string

  importedProcessId?: string
  processMagazine?:  string
  publicationDate?:  Date
  dispatch?:         string
  certificate?:      string
  description?:      string
  complement?:       string
  updatedByUser?:    string
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

