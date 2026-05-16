export type Representative = {
  name:           string
  nacionality:    string
  documentRG:     string
  documentCPF:    string
  titleJob:       string
  roleJob:        string
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
  createdAt:      Date
  updatedAt:      Date | null
}

export type RepresentativeReference = {
  id:            string
}