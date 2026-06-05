import { Client, User } from "@prisma/client";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { InMemoryClientsRepository } from "./in-memory-client-repository";
import { CreateRepresentativeDTO, Representative, RepresentativeOptionDTO, UpdateRepresentativeDTO } from "@shared/types/representative";
import { randomUUID } from "crypto";


export class InMemoryRepresentativeRepository implements RepresentativeRepository {
  constructor(
    private clientRepository: InMemoryClientsRepository,
  ) {}
  public items: Representative[] = []

  async create(data: CreateRepresentativeDTO): Promise<Representative> {
    const representative = {
      id: data.id ?? randomUUID(),

      clientId: data.clientId,

      name: data.name,
      nationality: data.nationality,

      documentRG: data.documentRG,
      documentCPF: data.documentCPF,

      titleJob: data.titleJob,
      roleJob: data.roleJob,

      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    }

    this.items.push(representative)

    return representative
  }

  async update(data: UpdateRepresentativeDTO): Promise<Representative> {
    
    const representative = this.items.findIndex(representative => {
      return representative.id === data.id
    })

    const updatedClient = {
      ...this.items[representative],
      ...data,
      updatedAt: new Date(),
    }

    this.items[representative] = updatedClient

    return updatedClient
  }

  async delete(id: string): Promise<Representative> {
    const representative = this.items.findIndex(representative => {
      return representative.id === id
    })

    const disabledRepresentative = {
      ...this.items[representative],
      deletedAt: new Date(),
    }

    this.items[representative] = disabledRepresentative

    return disabledRepresentative
  }

  async findById(id: string): Promise<Representative | null> {

    const representative = this.items.find(item => item.id == id)

    if (!representative) {
      return null
    }

    return representative
  }

  async findManyRepresentsOnClientsId(idClient: string): Promise<RepresentativeOptionDTO[] | null> {
    const representatives = this.items.filter(
      representative =>
        representative.clientId === idClient &&
        representative.deletedAt === null,
    )

    return representatives.map(representative => {
      const client = this.clientRepository.items.find(
        client => client.id === representative.clientId,
      )

      return {      
        value: client!.id,
        label: client!.legalName,
      }
    })
  }

  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(
    idUser: string,
    search: string,
  ): Promise<Representative[]> {
    const clientsFromUser = this.clientRepository.items.filter(client =>
      client.responsibleById === idUser
    )

    const clientIds = clientsFromUser.map(client => client.id)

    const representatives = this.items.filter(representative =>
      clientIds.includes(representative.clientId) &&
      representative.deletedAt === null &&
      representative.nationality
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    return representatives
  }

  async findManyByUserIdWithSearch(userId: string, search: string): Promise<Representative[] | null> {

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

    this.clientRepository.items.push(client)

    const clientIds =
      this.clientRepository.items
        .filter(client =>
          client.createdById === userId,
        )
        .map(client => client.id)

    return this.items.filter(representative => 
      representative.name.includes(search) 
      && clientIds.includes(representative.clientId))
  }
}