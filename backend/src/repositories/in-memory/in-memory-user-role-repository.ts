import { UserRoleRepository } from "@/repositories/user-role-repository";

import { CreateUserRoleDTO, UserRole } from "@shared/types/userRole"
import { randomUUID } from "crypto";

export class InMemoryUserRoleRepository implements UserRoleRepository {
  public items: UserRole[] = []

  async create(data: CreateUserRoleDTO): Promise<UserRole> {
    
    const userRole: UserRole = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      level: data.level,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    
    this.items.push(userRole)

    return userRole
  }

  async findById(id: string): Promise<UserRole | null> {
    const userRole = this.items.find(item => item.id == id)

    if (!userRole) {
      return null
    }

    return userRole
  }

  async findByName(name: string): Promise<UserRole | null> {
    const userRole = this.items.find(item => item.name == name)

    if (!userRole) {
      return null
    }

    return userRole
  }

  async findManyByLevelGreaterThanOrEqual(level: number): Promise<UserRole[] | null> {
    const userRoles = this.items.filter(item => item.level >= level)

    return userRoles
  }
}