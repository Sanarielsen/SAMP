import { Client, Prisma } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository"

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

  async create(data: Prisma.ClientCreateInput) {
    const client = {
      id: crypto.randomUUID(),
      legalName: "XPTO LTDA",
      tradeName: "XPTO",
      type: 1,
      protocol: "123",
      dataFundation: new Date(),
      locationAddress: "Address 1",
      correspondenceAddress: "Address 2",
      nameContact: "Samuel",
      numberContact: "11999999999",
      isActivated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: "user-1",
      responsibleById: "user-2",
    }
    
    this.items.push(client)

    return client
  }

}
