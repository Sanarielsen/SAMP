import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"

import { UsersRepository } from "@/repositories/users-repository";

import { UpdateUserDTO, User } from "@shared/types/user";


export class PrismaUsersRepository implements UsersRepository {
  
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
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
}