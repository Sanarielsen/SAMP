import { Client } from "@prisma/client";
import { RepresentativeEntire } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";


export class InMemoryRepresentativeRepository implements RepresentativeRepository {
  public representatives: RepresentativeEntire[] = []
  public clients: Client[] = []

  async create(data: RepresentativeEntire): Promise<RepresentativeEntire> {
    const representative = {
      ...data,
    }

    this.representatives.push(data)

    return representative
  }

  async findManyByUserIdWithSearch(userId: string, search: string): Promise<RepresentativeEntire[] | null> {

    const client: Client = {
      id: "client-1",
      legalName: "Corp CA",
      tradeName: "Comporacao de Roupas",
      type: 2,
      protocol: '87702517000100',
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua Beco das Flores, 123",
      correspondenceAddress: "Rua Beco das Flores, 321",
      nameContact: "Samuel",
      numberContact: "12341211234",
      isActivated: true,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      createdById: 'user-1',
      responsibleById: 'user-1',
    }

    this.clients.push(client)

    const clientIds =
      this.clients
        .filter(client =>
          client.createdById === userId,
        )
        .map(client => client.id)

    return this.representatives.filter(representative => 
      representative.name.includes(search) 
      && clientIds.includes(representative.idClient))
  }  
}