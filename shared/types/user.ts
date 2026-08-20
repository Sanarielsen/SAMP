export interface User {
  id:            string

  name:          string,
  email:         string,
  roleId:        string,
  password_hash: string | null,
  joker:         number,

  createdAt:     Date,
  updatedAt:     Date | null,
  deletedAt:     Date | null
}

export interface CreateUserDTO {
  id?:            string

  name:           string,
  email:          string,
  roleId:         string,
  password_hash:  string,
  joker?:         number,
}

export interface CreateUserWithoutPasswordDTO {
  name:           string,
  email:          string,
  roleId:         string,
}

export interface UpdateUserDTO {
  id:       string

  name?:    string,
  email?:   string,
  roleId?:  string,
}

export interface UpdateUserWithPasswordDTO {
  id: string

  name?:      string,
  email?:     string,
  password?:  string,
  roleId?:    string,
}

export type UserDetailDTO = {
  id: string,

  userRoleId:   string,
  userRoleName: string,

  name:       string,
  email:      string,
  createdAt:  Date,
  updatedAt:  Date | null,
}

export type UserPublicDTO = {
  id:         string,
  name:       string,
  email:      string,
  roleId:     string,
  createdAt:  Date,
  updatedAt:  Date | null,
  deletedAt:  Date | null,
}

export type UserPasswordUpdateVisualDTO = {
  id:           string,
  password:     string,
  confirm:      string
}

export type UserPasswordUpdateDTO = {
  id:           string,
  userLoggedId: string,
  password:     string,
  confirm:      string
}

export type UserRoleOptionDTO = {
  label: string
  value: string
}