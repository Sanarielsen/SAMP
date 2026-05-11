import { prisma } from "@/lib/prisma";
import { Client, Prisma } from "@prisma/client"
import { ClientRepository } from "../client-repository";

export class PrismaClientRepository implements ClientRepository {
  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    return client
  }
  async findByProtocol(protocol: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        protocol,
      },
    })

    return client
  }
  
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data
    })

    return client;
  }
}