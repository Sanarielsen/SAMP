import { Client, Prisma } from "@prisma/client";
import { ClientsRepository } from "@/repositories/clients-repository";

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  findByIdUser(id: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  findByProtocol(protocol: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    const client = {
      id: String(data.id),
      legalName: data.legalName,
      tradeName: data.tradeName,
      type: data.type,
      protocol: data.protocol,
      dataFundation: new Date(data.dataFundation),
      locationAddress: data.locationAddress,
      correspondenceAddress: data.correspondenceAddress,
      nameContact: data.nameContact,
      numberContact: data.numberContact,
      isActivated: data.isActivated,
      createdByUser: String(data.createdByUser),
      responsableId: String(data.responsableId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(client)

    return client
  }


}
