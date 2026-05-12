import { Client, Prisma } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository"
import { CreateClientDTO } from "@/types/client";

export class InMemoryClientsRepository implements ClientRepository {
  public items: Client[] = []
  
  async findById(id: string): Promise<Client | null> {
    const Client = this.items.find(item => item.id == id)

    if (!Client) {
      return null
    }

    return Client
  }
  
  async findByProtocol(protocol: string) {
    const Client = this.items.find(item => item.protocol == protocol)

    if (!Client) {
      return null
    }

    return Client
  }

  async create(data: CreateClientDTO) {
    const client: Client = {
      id: crypto.randomUUID(),
      ...data,
      createdById: "user-1",
      responsibleById: "user-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    this.items.push(client)

    return client
  }

}
