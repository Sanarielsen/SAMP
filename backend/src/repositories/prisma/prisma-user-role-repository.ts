import { prisma } from "@/lib/prisma";
import { UserRoleRepository } from "@/repositories/user-role-repository";

import { 
  CreateUserRoleDTO, 
  UserRole 
} from "@shared/types/userRole";

export class PrismaUserRoleRepository implements UserRoleRepository {

  create(data: CreateUserRoleDTO): Promise<UserRole> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<UserRole | null> {
    
    const userRole = prisma.userRole.findUnique({
      where: {
        id,
      },
    })

    if (!userRole) {
      return null
    }

    return userRole
  }

  async findManyByLevelGreaterThanOrEqual(level: number, joker: number): Promise<UserRole[] | null> {

    if (joker == 1) {
      return prisma.userRole.findMany()
    }
    return prisma.userRole.findMany({
      where: {
        level: {
          gte: level,
        },
      },
    })
  }

}