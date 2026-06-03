export interface User {
  id:            string

  name:          string,
  email:         string,
  roleId:        string,
  password_hash: string,

  createdAt:     Date,
  updatedAt:     Date | null,
  //deletedAt: Date | null
}

export interface CreateUserDTO {
  id:       string

  name:    string,
  email:   string,
  roleId:  string,
  password_hash: string,
}

export interface UpdateUserDTO {
  id:       string

  name?:    string,
  email?:   string,
  roleId?:  string,
}

export type UserDetailDTO = {
  id:         string,
  name:       string,
  email:      string,
  roleId:     string,
  createdAt:  Date,
  updatedAt:  Date
}

export type UserRoleOptionDTO = {
  label: string
  value: string
}