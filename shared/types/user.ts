export interface User {
  id:            string

  name:          string,
  email:         string,
  roleId:        string,
  password_hash: string,
  joker:         number,

  createdAt:     Date,
  updatedAt:     Date | null,
  deletedAt:     Date | null
}
export interface CreateUserDTO {
  id?:       string

  name:    string,
  email:   string,
  roleId:  string,
  password_hash: string,
  joker?:       number,
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
  roleName:   string | null,
  createdAt:  Date,
  updatedAt:  Date | null
}

export type UserPublicDTO = {
  id:         string,
  name:       string,
  email:      string,
  roleId:     string,
  createdAt:  Date,
  updatedAt:  Date | null,
}

export type UserRoleOptionDTO = {
  label: string
  value: string
}