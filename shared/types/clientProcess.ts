export type Process = {
  id:             string
  numberProcess:  string
  title:          string //Acompanhamento?
  holder:         string //Titular
  presentation:   string
  nature:         string
  
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}