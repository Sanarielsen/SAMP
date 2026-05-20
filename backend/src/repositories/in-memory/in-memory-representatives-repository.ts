import { Client, User } from "@prisma/client";
import { RepresentativeCustom, RepresentativeEntire, RepresentativeList } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { InMemoryClientsRepository } from "./in-memory-client-repository";


export class InMemoryRepresentativeRepository implements RepresentativeRepository {
  constructor(
    private clientRepository: InMemoryClientsRepository,
  ) {}

  public representatives: RepresentativeEntire[] = []
  public clients: Client[] = []
  public users: User[] = []

  async create(data: RepresentativeEntire): Promise<RepresentativeEntire> {
    const representative = {
      ...data,
    }

    this.representatives.push(data)

    return representative
  }

  async update(data: RepresentativeCustom): Promise<RepresentativeCustom> {
    
    const representative = this.representatives.findIndex(representative => {
      return representative.id === data.id
    })

    const updatedClient = {
      ...this.representatives[representative],
      ...data,
      updatedAt: new Date(),
    }

    this.representatives[representative] = updatedClient

    return updatedClient
  }

  async findById(id: string): Promise<RepresentativeEntire | null> {
  
    const representative = this.representatives.find(item => item.id == id)

    if (!representative) {
      return null
    }

    return representative
  }

  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(
    idUser: string,
    search: string,
  ): Promise<RepresentativeEntire[] | null> {
    const clientsFromUser = this.clientRepository.items.filter(client =>
      client.responsibleById === idUser
    )

    const clientIds = clientsFromUser.map(client => client.id)

    const representatives = this.representatives.filter(representative =>
      clientIds.includes(representative.idClient) &&
      representative.deletedAt === null &&
      representative.nationality
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    return representatives
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

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}