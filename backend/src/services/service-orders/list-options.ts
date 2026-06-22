import { OrderRepository } from '@/repositories/order-repository';
import { ClientRepository } from '@/repositories/client-repository';

import { OptionsControlledBox } from '@shared/types/values'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';


export class ListOrdersWithOptionsUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(clientId: string): Promise<OptionsControlledBox[] | null> {

    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new ResourceAlreadyExistsError();
    }

    return await this.orderRepository.findManyOptionsByClientId(clientId);
  }
}