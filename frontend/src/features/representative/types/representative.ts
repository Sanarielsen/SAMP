export interface Representative {
  name:         string,
  clientId:     string,
  nationality:  string,
  documentRG:   string
  documentCPF:  string
  titleJob:     string
  roleJob:      string
  createdAt?:   Date
  updatedAt?:   Date | null
  deletedAt?:   Date | null
}

export interface RepresentativeDetails extends Representative {
  id:       string,
  clientId: string,
}