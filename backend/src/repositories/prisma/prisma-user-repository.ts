import { prisma } from "@/lib/prisma";

import { UserRepository } from "@/repositories/user-repository";

import { 
  CreateUserDTO, 
  UpdateUserDTO, 
  UserDetailDTO,
  User
} from "@shared/types/user";


export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data
    })
  }

  async update(data: UpdateUserDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
  
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<UserDetailDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userRole: true,
      },
    })

    if (!user || !user?.userRole) {
      return null
    }

    return {
      ...user,
      userRole: user.userRole
    }
  }

  async findAuthByEmail(email: string): Promise<User | null> {

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async findBySearch(search: string): Promise<UserDetailDTO[]> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            userRole: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        userRole: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    })

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      userRole: user.userRole
        ? {
            id: user.userRole.id,
            name: user.userRole.name,
          }
        : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }
}