import { OrderTypeRepository } from "@/repositories/order-type-repository";

import { OptionsControlledBox } from "@shared/types/values";


export class ListOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository,
  ) {}

  async execute(): Promise<OptionsControlledBox[] | null> {
    
    return await this.orderTypeRepository.findAllActiveAsOptions()
  }
}
