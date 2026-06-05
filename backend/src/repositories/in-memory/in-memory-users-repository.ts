import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

import { CreateUserDTO, UpdateUserDTO } from "@shared/types/user";
import { randomUUID } from "node:crypto";


export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  
  async findById(id: string): Promise<User | null> {
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
  async create(data: CreateUserDTO) {

    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      password_hash: data.password_hash,
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

    return updatedUser
  }

}
