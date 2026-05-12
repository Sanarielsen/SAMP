import { Client } from "@prisma/client"
import { ClientRepository } from "@/repositories/client-repository"
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists-error"
import { UsersRepository } from "@/repositories/users-repository"
import { NonExistUserError } from "./errors/non-exist-user-error"

interface CreateClientUseCaseRequest {
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
      createdBy: idUser,
      responsibleBy: idUser
    });

    return {
      client,
    };
  }
}
