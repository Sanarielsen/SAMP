import { prisma } from "@/lib/prisma";

import { UsersRepository } from "@/repositories/users-repository";

import { CreateUserDTO, UpdateUserDTO, User } from "@shared/types/user";


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
}