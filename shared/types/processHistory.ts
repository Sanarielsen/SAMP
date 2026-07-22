export type ProcessHistory = {
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
  id:             string
  numberMagazine: string
  categoryName:   string
  fileName:       string
  createdAt:      Date
}
