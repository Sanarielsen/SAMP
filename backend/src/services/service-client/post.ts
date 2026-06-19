import { Client } from "@prisma/client"
import { ClientRepository } from "@/repositories/client-repository"
import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error"
import { UserRepository } from "@/repositories/user-repository"
import { NonExistUserError } from "@/services/errors/non-exist-user-error"
import { randomUUID } from "node:crypto"

interface CreateClientUseCaseRequest {
  id: string
  idUser: string,
  legalName: string  
  tradeName: string  
  type: number 
  protocol: string   
  dataFundation: Date
  locationAddress: String
  correspondenceAddress: String
  nameContact: String
  numberContact: String
  isActivated: boolean
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    id,
    idUser,
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact,
    isActivated
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    
    const userLogged = await this.userRepository.findById(idUser);
    
    if (!userLogged) {
      throw new NonExistUserError();
    }

    const clientWithSameProtocol = await this.clientRepository.findByProtocol(protocol)

    if (clientWithSameProtocol) {
      throw new ResourceAlreadyExistsError();
    }

    const client = await this.clientRepository.create({
      id: id ?? randomUUID(),
      legalName: legalName,
      tradeName: tradeName,
      type: type,
      protocol: protocol,
      dataFundation: dataFundation,
      locationAddress: String(locationAddress),
      correspondenceAddress: String(correspondenceAddress),
      nameContact: String(nameContact),
      numberContact: String(numberContact),
      isActivated: isActivated,
      createdAt: new Date(Date.now()),
      createdById: idUser,
      responsibleById: idUser
    });

    return {
      client,
    };
  }
}