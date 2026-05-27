import { OrderTypeOptions } from "@shared/types/orderType"


export interface OrderTypeRepository {
  findAllOptions(): Promise<OrderTypeOptions[] | null>
}