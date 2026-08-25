import { OrderTypeRepository } from "@/repositories/order-type";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { OrderType } from "@shared/types/orderType";


export class GetOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository
  ) {}

  async execute(id: number): Promise<OrderType> {
    
    const orderType = await this.orderTypeRepository.findById(id);
    if (!orderType) throw new ResourceNotFoundError();

    return orderType
  }
}