import { randomUUID } from "node:crypto";
import { hash } from 'bcryptjs'

import { UserRepository } from "@/repositories/user";

import { 
  CreateUserDTO, 
  CreateUserWithoutPasswordDTO, 
  UpdateUserDTO,
  User,
  UserDetailDTO,
  UserDetailsForAdminDTO,
  UserPasswordUpdateDTO,
  UserPublicDTO,
} from "@shared/types/user";
import { UserRole } from "@shared/types/userRole";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []
  public roles: UserRole[] = []

  async create(data: CreateUserDTO) {

    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      password_hash: data.password_hash,
      joker: data.joker ?? 0,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    
    this.items.push(user)

    return user
  }

  async createWithoutPassword(data: CreateUserWithoutPasswordDTO): Promise<User> {
    
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: null,
      roleId: data.roleId,
      joker: 0,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    
    this.items.push(user)

    return user
  }

  async update(data: UpdateUserDTO) {
    const userIdenitity = this.items.findIndex(user => {
      return user.id === data.id
    })

    const updatedUser = {
      ...this.items[userIdenitity],
      ...data,
    }

    this.items[userIdenitity] = updatedUser
  }

  async updatePassword(data: UserPasswordUpdateDTO): Promise<void> {
    const userIdentity = this.items.findIndex(user => {
      return user.id === data.id
    })

    const updatedUser = {
      ...this.items[userIdentity],
      ...data,
      password_hash: data.password
      ? await hash(data.password, 6)
      : this.items[userIdentity].password_hash,
    }

    this.items[userIdentity] = updatedUser
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex(user => {
      return user.id === id
    })

    const disabledUser = {
      ...this.items[userIndex],
      deletedAt: new Date(),
    }

    this.items[userIndex] = disabledUser
  }
  
  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id == id)

    if (!user) {
      return null
    }

    return user
  }

  async findByIdWithoutPassword(id: string): Promise<UserPublicDTO | null> {
    const user = this.items.find(item => item.id == id)

    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }

  async findByEmail(email: string): Promise<UserDetailDTO | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return {
      ...user,
      userRoleId: 'role-id',
      userRoleName: 'role-name',
    }
  }
  
  async findAuthByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findManyBySearchWithRelations(search: string): Promise<UserDetailsForAdminDTO[]> {
    return this.items
      .filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
      .map(user => ({
        ...user,
        roleName: this.roles.find(r => r.id === user.roleId)?.name ?? '',
        userRoleId: 'role-id',
        userRoleName: 'role-name',
        validated: user.password_hash ? true : false,
      }))
  }

  async findManyOptions(): Promise<OptionsControlledBox[] | null> {
    return this.items.map((item) => ({
      label: item.name + " - " + item.email,
      value: item.id
    }))
  }
}
