import { ClientRepository } from '@/repositories/client-repository'
import { formatDocument } from '@/utils/formatDocument'


interface ListClientWithOptionsUseCaseRequest {
  responsibleById: string
}

type ListClientUseCaseResponse = {
  label: string,
  value: string
}[] | []

export class ListClientWithOptionsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    responsibleById
  }: ListClientWithOptionsUseCaseRequest): Promise<ListClientUseCaseResponse> {
    
    const clients = await this.clientRepository.findByIdUserResponsableActivated(responsibleById)

    if (!clients) {
      return []
    }

    return clients.map(client => ({
      label: (client.tradeName + " - " + formatDocument(client.protocol)),
      value: client.id,
    }))
  }
}