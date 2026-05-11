import { Client, Prisma } from "@prisma/client"

export interface ClientsRepository {
  findByIdUser(id: string): Promise<Client|null>
  findByProtocol(protocol: string): Promise<Client|null>
  create(data: Prisma.ClientUncheckedCreateInput): Promise<Client>
}