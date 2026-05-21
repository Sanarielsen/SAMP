import { Client, User } from "@prisma/client";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { InMemoryClientsRepository } from "./in-memory-client-repository";
import { CreateRepresentativeDTO, Representative, UpdateRepresentativeDTO } from "@shared/types/representative";


export class InMemoryRepresentativeRepository implements RepresentativeRepository {
  constructor(
    private clientRepository: InMemoryClientsRepository,
  ) {}

  public representatives: Representative[] = []
  public clients: Client[] = []
  public users: User[] = []

  async create(data: CreateRepresentativeDTO): Promise<Representative> {
    const representative = {
      id: 'new-representative',

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

    this.representatives.push(representative)

    return representative
  }

  async update(data: UpdateRepresentativeDTO): Promise<Representative> {
    
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

  async findById(id: string): Promise<Representative | null> {

    const representative = this.representatives.find(item => item.id == id)

    if (!representative) {
      return null
    }

    return representative
  }

  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(
    idUser: string,
    search: string,
  ): Promise<Representative[] | null> {
    const clientsFromUser = this.clientRepository.items.filter(client =>
      client.responsibleById === idUser
    )

    const clientIds = clientsFromUser.map(client => client.id)

    const representatives = this.representatives.filter(representative =>
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

    this.clients.push(client)

    const clientIds =
      this.clients
        .filter(client =>
          client.createdById === userId,
        )
        .map(client => client.id)

    return this.representatives.filter(representative => 
      representative.name.includes(search) 
      && clientIds.includes(representative.clientId))
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}