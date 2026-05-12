import { Prisma, Client } from "@prisma/client"
import { CreateClientDTO } from "@/types/client"

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
  findByProtocol(protocol: string): Promise<Client|null>
  create(data: CreateClientDTO): Promise<Client>
}