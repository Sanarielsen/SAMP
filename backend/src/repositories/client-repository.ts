import { Prisma, Client } from "@prisma/client"
import { CreateClientDTO } from "@/types/client"

export interface ClientRepository {
  findById(id: string): Promise<Client | null>
  findByIdUserResponsable(idUser: string): Promise<Client[]>
  findByProtocol(protocol: string): Promise<Client|null>

  create(data: CreateClientDTO): Promise<Client>
  update(id: string, data: Partial<CreateClientDTO>): Promise<Client>
  updateStatus(id: string, data: Partial<CreateClientDTO>): Promise<Client>
}