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

export type ProcessHistoryDetailDTO = {
  numberMagazine: string
  categoryName:   string
  fileName:       string
  createdAt:      Date
}
