import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


export class DeleteProcessPublicationUseCase {
  constructor(
    private processPublicationRepository: ProcessPublicationRepository
  ) {}

  async execute(id: string): Promise<void> {
    
    const processPublication = await this.processPublicationRepository.findById(id)
    if (!processPublication) throw new ResourceNotFoundError();

    await this.processPublicationRepository.delete(id)

  }
}