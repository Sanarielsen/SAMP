import { randomUUID } from "node:crypto";

import { UserRepository } from "@/repositories/user-repository";

import { 
  CreateUserDTO, 
  UpdateUserDTO,
  User,
  UserDetailDTO,
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
  
  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id == id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<UserDetailDTO | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return {
      ...user,
      roleName: 'role-test'
    }
  }
  
  async findAuthByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findBySearch(search: string): Promise<UserDetailDTO[]> {
    return this.items
      .filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
      .map(user => ({
        ...user,
        roleName: this.roles.find(r => r.id === user.roleId)?.name ?? '',
      }))
  }

  async findManyOptions(): Promise<OptionsControlledBox[] | null> {
    return this.items.map((item) => ({
      label: item.name + " - " + item.email,
      value: item.id
    }))
  }
}
