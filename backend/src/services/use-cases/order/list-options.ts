import { OrderRepository } from '@/repositories/order-repository';
import { ClientRepository } from '@/repositories/client-repository';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

import { OptionsControlledBox } from '@shared/types/values'


export class ListOrdersWithOptionsUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(clientId: string): Promise<OptionsControlledBox[] | null> {

    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new ResourceNotFoundError();
    }

    return await this.orderRepository.findManyOptionsByClientId(clientId);
  }
}