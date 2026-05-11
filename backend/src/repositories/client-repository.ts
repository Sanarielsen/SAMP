import { Prisma, Client } from "@prisma/client"

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
  findByProtocol(protocol: string): Promise<Client|null>
  create(data: Prisma.ClientCreateInput): Promise<Client>
}