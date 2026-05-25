import { CreateOrderDTO, Order, UpdateOrderDTO } from "@shared/types/orders"


export interface OrderRepository {
  create(data: CreateOrderDTO): Promise<Order>
  update(data: Partial<UpdateOrderDTO>): Promise<Order>
  delete(id: string): Promise<Order>

  findById(id: string): Promise<Order | null>
  findManyByClientId(clientId: string): Promise<Order[] | null>
}