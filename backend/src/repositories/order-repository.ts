import { CreateOrderDTO, Order } from "@shared/types/orders"


export interface OrderRepository {
  create(data: CreateOrderDTO): Promise<Order>
}