import { prisma } from "@/lib/prisma";
import { Client, Prisma } from "@prisma/client"
import { ClientsRepository } from "../clients-repository";

export class PrismaClientsRepository implements ClientsRepository {
  findByIdUser(id: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  findByProtocol(protocol: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data
    })

    return client;
  }

}