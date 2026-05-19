import { Prisma, Client } from "@prisma/client"
import { CreateClientDTO } from "@/types/client"

export interface ClientRepository {
  create(data: CreateClientDTO): Promise<Client>

  findById(id: string): Promise<Client | null>
  findByIdUserResponsableActivated(idUser: string): Promise<Client[] | null>
  findByIdUserResponsableAndSearch(idUser: string, search: string): Promise<Client[]>
  findByProtocol(protocol: string): Promise<Client|null>

  update(id: string, data: Partial<CreateClientDTO>): Promise<Client>
  updateStatus(id: string, data: Partial<CreateClientDTO>): Promise<Client>
}