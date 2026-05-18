export type RepresentativeDTO = {
  idClient:       string
  name:           string
  nacionality:    string
  documentRG:     string
  documentCPF:    string
  titleJob:       string
  roleJob:        string
createdAt:      Date | null
}

export type RepresentativeEntire = {
  id:             string
  idClient:       string
  name:           string
  nacionality:    string
  documentRG:     string
  documentCPF:    string
  titleJob:       string
  roleJob:        string
  createdAt?:     Date
  updatedAt?:     Date | null
}

export type RepresentativeReference = {
  id:            string
}