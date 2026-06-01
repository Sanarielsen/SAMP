export interface UserRole {
  id:           string
  name:         string
  description:  string 
  level:        number
  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

export interface CreateUserRoleDTO {
  id?:          string
  name:         string
  description:  string 
  level:        number
  createdAt:    Date
}