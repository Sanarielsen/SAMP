import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

import { CreateUserDTO, UpdateUserDTO } from "@shared/types/user";


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
      id: 'user-1',
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date()
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
