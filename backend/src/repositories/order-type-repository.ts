import { 
  OrderType, 
  OrderTypeCreateDTO, 
  OrderTypeUpdateDTO 
} from "@shared/types/orderType"
import { OptionsControlledBox } from "@shared/types/values"


export interface OrderTypeRepository {
  create(data: OrderTypeCreateDTO): Promise<OrderType>
  update(data: OrderTypeUpdateDTO): Promise<OrderType>
  delete(id: number): Promise<void>

  findById(id: number): Promise<OrderType | null>
  findAllActiveAsOptions(): Promise<OptionsControlledBox[] | null>
}