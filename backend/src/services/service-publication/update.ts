import { ClientRepository } from "@/repositories/client-repository";
import { ProcessTypeRepository } from "@/repositories/process-type-repository";
import { PublicationRepository } from "@/repositories/publication-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";

import { 
  Publication, 
  UpdatePublicationDTO 
} from "@shared/types/publication";


export class UpdatePublicationUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private processTypeRepository: ProcessTypeRepository, 
    private publicationRepository: PublicationRepository
  ) {}

  async execute(data: UpdatePublicationDTO): Promise<Publication> {

    const client = await this.clientRepository.findById(data.clientId)

    if (!client) throw new ResourceNotFoundError();

    const processType = await this.processTypeRepository.findById(data.processTypeId)
    
    if (!processType) throw new ResourceNotFoundError();

    const publicationWillBeUpdated = await this.publicationRepository.findById(data.id)
    
    if (!publicationWillBeUpdated) throw new ResourceNotFoundError();

    if (data.processNumber && data.processNumber !== publicationWillBeUpdated.processNumber) {
      const currentPublication = await this.publicationRepository.findByProcessNumber(data.processNumber)
      if (currentPublication) throw new ResourceAlreadyExistsError();
    }
  
    return await this.publicationRepository.update(data)
  }
}