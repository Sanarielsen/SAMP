import { randomUUID } from "node:crypto";

import { UsersRepository } from "@/repositories/users-repository";

import { CreateUserDTO, UpdateUserDTO, User, UserPublicDTO } from "@shared/types/user";


export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

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

    return updatedUser
  }
  
  async findById(id: string): Promise<UserPublicDTO | null> {
    const user = this.items.find(item => item.id == id)

    if (!user) {
      return null
    }

    return user
  }
  
  async findByEmail(email: string) {
    const user = this.items.find(item => item.email == email)

    if (!user) {
      return null
    }

    return user
  }

  async findBySearch(search: string): Promise<UserPublicDTO[]> {
    
    return this.items.filter(item =>
      item.deletedAt === null &&
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }
}
