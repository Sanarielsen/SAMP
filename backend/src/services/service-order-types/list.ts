import { OrderTypeRepository } from "@/repositories/order-type-repository";

import { OrderTypeOptions } from "@shared/types/orderType"

export class ListOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository,
  ) {}

  async execute(): Promise<OrderTypeOptions[] | null> {
    
    return await this.orderTypeRepository.findAllOptions()
  }
}
