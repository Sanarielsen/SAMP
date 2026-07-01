export type ProcessType = {
  id: string          
  name: string
  slug: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type ProcessTypeCreateDTO = {
  name: string
  slug: string        
  description: string 
}