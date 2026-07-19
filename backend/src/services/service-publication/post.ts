import { ClientRepository } from "@/repositories/client-repository";
import { ProcessTypeRepository } from "@/repositories/process-type-repository";
import { PublicationRepository } from "@/repositories/publication-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";

import { 
  Publication,
  CreatePublicationDTO, 
} from "@shared/types/publication";


export class PostPublicationUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private processTypeRepository: ProcessTypeRepository,
    private publicationRepository: PublicationRepository
  ) {}

  async execute(data: CreatePublicationDTO): Promise<Publication> {
    
    const client = await this.clientRepository.findById(data.clientId)

    if (!client) throw new ResourceNotFoundError();

    const processType = await this.processTypeRepository.findById(data.processTypeId)
    
    if (!processType) throw new ResourceNotFoundError();

    const currentPublication = await this.publicationRepository.findByProcessNumber(data.processNumber)

    if (currentPublication) throw new ResourceAlreadyExistsError();

    return await this.publicationRepository.create(data);
  }
}