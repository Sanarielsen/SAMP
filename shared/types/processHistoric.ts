export type ProcessHistoric = {
  id:         string
  categoryId: string

  numberMagazine: string
  filePath:       string
  fileName:       string

  createdAt:  Date
}

export type CreateProcessHistoricDTO = {
  categoryId: string

  numberMagazine: string
  filePath:       string
  fileName:       string
}

export type DetailsProcessHistoryDTO = {
  categoryName:   string
  numberMagazine: string
  fileName:       string
  createdAt:      Date
}