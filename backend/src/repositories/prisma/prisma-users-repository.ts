import { prisma } from "@/lib/prisma";

import { UsersRepository } from "@/repositories/users-repository";

import { CreateUserDTO, UpdateUserDTO, User, UserDetailDTO, UserPublicDTO } from "@shared/types/user";


export class PrismaUsersRepository implements UsersRepository {
  
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data
    })

    return user;
  }

  update(data: UpdateUserDTO): Promise<User> {
    return prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
  
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        userRole: true,
      },
    })

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
      roleName: user.userRole ? user.userRole?.name : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ? user.updatedAt : null
    }))
  }
}