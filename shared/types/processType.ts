export type ProcessType = {
  id: string          
  name: string
  slug: string
  description: string | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type ProcessTypeCreateDTO = {
  name: string
  slug: string        
  description?: string | null
}
