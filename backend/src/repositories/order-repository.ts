import { CreateOrderDTO, Order, OrderDetailTable, OrderWithTypeDetailDTO, UpdateOrderDTO } from "@shared/types/orders"


export interface OrderRepository {
  create(data: CreateOrderDTO): Promise<Order>
  update(data: Partial<UpdateOrderDTO>): Promise<Order>
  delete(id: string): Promise<Order>

  findById(id: string): Promise<Order | null>
  findByIdWithType(id: string): Promise<OrderWithTypeDetailDTO | null>
  findManyByClientId(clientId: string, search: string): Promise<OrderDetailTable[] | null>
}