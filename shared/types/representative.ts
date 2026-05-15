export type RepresentativeDTO = {
  idClient:       string
  name:           string
  nacionality:    string
  documentRG:     string
  documentCPF:    string
  titleJob:       string
  roleJob:        string
  createdAt:      Date
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
  deletedAt?:     Date | null
}


export type RepresentativeList = {
  id:             string
  name:           string
  idClient:       string
  nacionality:    string
  documentRG:     string
  documentCPF:    string
  titleJob:       string
  roleJob:        string
  createdAt:      Date
  updatedAt:      Date | null
}

export type RepresentativeCustom = {
  id:             string
  idClient:       string,
  name?:          string,
  nacionality?:   string,
  documentRG?:    string,
  documentCPF?:   string,
  titleJob?:      string,
  roleJob?:       string,
  createdAt?:     Date
  updatedAt?:     Date | null
  deletedAt?:     Date | null
}


export type RepresentativeReference = {
  id:            string
}