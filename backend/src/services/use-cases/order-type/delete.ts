import { OrderTypeRepository } from "@/repositories/order-type-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeleteOrderTypeUseCase {
  constructor(
    private orderTypeRepository: OrderTypeRepository
  ) {}

  async execute( id: number ): Promise<void> {
    
    const orderType = await this.orderTypeRepository.findById(id)
    if (!orderType) throw new ResourceNotFoundError();

    await this.orderTypeRepository.delete(id)
  }
}