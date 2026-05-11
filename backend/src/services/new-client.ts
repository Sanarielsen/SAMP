import { hash } from "bcryptjs"

import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { ClientsRepository } from "@/repositories/clients-repository"
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repository"
import { Client, Prisma } from "@prisma/client"

interface NewClientRequest {
  idUser: string,
  legalName: string,
  tradeName: string,
  type: number,
  protocol: string,
  dataFundation: Date,
  locationAddress: string,
  correspondenceAddress: string,
  nameContact: string,
  numberContact: string
}

interface NewClientResponse {
  client: Client
}

export class NewClientUseCase {
  constructor(
    private clientRepository: ClientsRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    idUser,
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact
  }: NewClientRequest): Promise<NewClientResponse> {
    
    // const userExists = await this.userRepository.findById(idUser);

    // if (!userExists) {
    //   throw new Error("User does not exist")
    // }

    const client = await this.clientRepository.create({
      legalName,
      tradeName,
      type,
      protocol,
      dataFundation,
      locationAddress,
      correspondenceAddress,
      nameContact,
      numberContact,
      isActivated: true,
      createdByUser: idUser,
      responsableId: idUser
    });

    return {
      client,
    };
  }
}
