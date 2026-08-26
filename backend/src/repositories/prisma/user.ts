import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { UserRepository } from "@/repositories/user";

import { 
  CreateUserDTO, 
  UpdateUserDTO, 
  UserDetailDTO,
  User,
  UserPasswordUpdateDTO,
  UserPublicDTO,
  CreateUserWithoutPasswordDTO,
  UserDetailsForAdminDTO
} from "@shared/types/user";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data
    })
  }

  async createWithoutPassword(data: CreateUserWithoutPasswordDTO): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
        password_hash: null
      }
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

  async updatePassword(data: UserPasswordUpdateDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        password_hash: await hash(data.password, 6),
        updatedAt: new Date(Date.now())
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }
  
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByIdWithoutPassword(id: string): Promise<UserPublicDTO | null> {
    const user =  await prisma.user.findUnique({
      where: {
        id,
      },
    })

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
      userRoleId: user.userRole.id,
      userRoleName: user.userRole.name
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

  async findManyBySearchWithRelations(search: string): Promise<UserDetailsForAdminDTO[]> {
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
        password_hash: true,
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
      validated: user.password_hash ? true : false,
      userRoleId: user.userRole!.id,
      userRoleName: user.userRole!.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }

  async findManyOptions(): Promise<OptionsControlledBox[] | null> {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null
      }
    })

    return users.map( (user) => ({
      label: user.name + ' - ' + user.email,
      value: user.id
    }))
  }
}