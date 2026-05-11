import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";


export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  
  async findByEmail(email: string) {
    const user = this.items.find(item => item.email == email)

    if (!user) {
      return null
    }

    return user
  }
  async create(data: Prisma.UserCreateInput) {

    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.items.push(user)

    return user
  }

}
