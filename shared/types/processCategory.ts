export type ProcessCategory = {
  id: string,
  name: string,
  description: string,
  slug: string,
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type ProcessCategoryCreateDTO = {
  name: string,
  description: string,
  slug: string,
}