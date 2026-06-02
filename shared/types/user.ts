export interface User {
  id: string

  name:  string,
  email: string,
  role:  string,
  password_hash: string,

  createdAt: Date
  updatedAt: Date | null
  //deletedAt: Date | null
}

export interface UpdateUserDTO {
  id:     string

  name?:  string,
  email?: string,
  role?:  string,
}

export type UserDetailDTO = {
  id: string,
  name: string,
  email: string,
  role: string,
  createdAt: Date,
  updatedAt: Date
}

export type UserRoleOptionDTO = {
  label: string
  value: string
}