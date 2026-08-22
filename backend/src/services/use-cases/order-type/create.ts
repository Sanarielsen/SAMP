import { OrderTypeRepository } from "@/repositories/order-type-repository";
import { OrderType, OrderTypeCreateDTO } from "@shared/types/orderType";


export class CreateOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository
  ) {}

  async execute(data: OrderTypeCreateDTO): Promise<OrderType> {
    
    return await this.orderTypeRepository.create(data)
  }
}