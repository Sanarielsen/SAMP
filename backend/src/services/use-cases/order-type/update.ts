import { OrderTypeRepository } from "@/repositories/order-type";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  OrderType,
  OrderTypeUpdateDTO
} from "@shared/types/orderType";


export class UpdateOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository
  ) {}

  async execute( data: OrderTypeUpdateDTO ): Promise<OrderType> {
    
    const orderType = await this.orderTypeRepository.findById(data.id)
    if (!orderType) throw new ResourceNotFoundError();

    return await this.orderTypeRepository.update(data)
  }
}