import { prisma } from "@/lib/prisma";
import { Client, Prisma } from "@prisma/client"
import { ClientRepository } from "../client-repository";
import { CreateClientDTO } from "@/types/client";

export class PrismaClientRepository implements ClientRepository {
  async findByIdUserResponsable(idUser: string): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      where: {
        responsibleById: idUser,
        isActivated: true,
      },
    })

    return clients
  }
  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    return client
  }
  async findByProtocol(protocol: string): Promise<Client | null> {
    return await prisma.client.findUnique({
      where: {
        protocol,
      },
    })
    
  }
  
  async create(data: CreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data
    })

    return client;
  }

  async update(
    id: string,
    data: Partial<CreateClientDTO>,
  ): Promise<Client> {

    const client = await prisma.client.update({
      where: {
        id,
      },
      data,
    })

    return client
  }

  async updateStatus(
    id: string,
    data: Partial<CreateClientDTO>,
  ): Promise<Client> {

    return prisma.client.update({
      where: {
        id,
      },
      data,
    })
  }
}