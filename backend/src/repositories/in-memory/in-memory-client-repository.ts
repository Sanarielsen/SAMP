import { Client, Prisma } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository"
import { CreateClientDTO } from "@/types/client";
import { randomUUID } from "node:crypto";

export class InMemoryClientsRepository implements ClientRepository {
  public items: Client[] = []

  async findByIdUserResponsableActivated(
    id: string,
  ): Promise<Client[] | null> {

    const clients = this.items.filter(client =>
      client.responsibleById === id &&
      client.isActivated === true
    )

    return clients
  }

  async findByIdUserResponsableAndSearch(idUser: string, search: string): Promise<Client[]> {
    const clients = this.items.filter(
      item =>
        item.responsibleById === idUser &&
        item.legalName.includes(search)
    )

    return clients
  }
  async findByIdUserResponsable(idUser: string): Promise<Client[]> {
    return this.items.filter(client => {
      return client.responsibleById === idUser
    })
  }
  
  
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
      ...data,
      id: data.id ?? randomUUID(),
      updatedAt: new Date(Date.now())
    }

    this.items.push(client)

    return client
  }

  async update(
    id: string,
    data: Partial<CreateClientDTO>,
  ): Promise<Client> {

    const client = this.items.findIndex(client => {
      return client.id === id
    })

    const updatedClient = {
      ...this.items[client],
      ...data,
      updatedAt: new Date(),
    }

    this.items[client] = updatedClient

    return updatedClient
  }

  async updateStatus(id: string, data: Partial<CreateClientDTO>): Promise<Client> {
    const clientIndex = this.items.findIndex(client => {
      return client.id === id
    })

    this.items[clientIndex].isActivated = data.isActivated!

    this.items[clientIndex].updatedAt = new Date()

    return this.items[clientIndex]  
  }

}
