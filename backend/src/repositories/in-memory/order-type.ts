import { OrderTypeRepository } from "@/repositories/order-type-repository";

import { 
  OrderType, 
  OrderTypeCreateDTO, 
  OrderTypeUpdateDTO, 
} from "@shared/types/orderType";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryOrderTypeRepository implements OrderTypeRepository {
  public items: OrderType[] = []

  async create(data: OrderTypeCreateDTO): Promise<OrderType> {
    const newOrderType: OrderType = {
      ...data,
      id: this.items.length + 1,
      observation: data.observation ?? null,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deletedAt: null
    }

    this.items.push(newOrderType)

    return newOrderType
  }
  
  async update(data: OrderTypeUpdateDTO): Promise<OrderType> {
    const ordertTypeIndex = this.items.findIndex(current => {
      return current.id === data.id
    })

    const updatedOrderType = {
      ...this.items[ordertTypeIndex],
      ...data,
      updatedAt: new Date(),
    }

    this.items[ordertTypeIndex] = updatedOrderType

    return updatedOrderType
  }

  async delete(id: number): Promise<void> {
    const orderTypeIndex = this.items.findIndex(method => {
      return method.id === id
    })

    const disabledOrderType = {
      ...this.items[orderTypeIndex],
      deletedAt: new Date(),
    }

    this.items[orderTypeIndex] = disabledOrderType
  }

  async findById(id: number): Promise<OrderType | null> {
    const orderType = this.items.find(type => type.id === id)

    if (!orderType) {
      return null
    }
    
    return orderType
  }

  findAllActiveAsOptions(): Promise<OptionsControlledBox[] | null> {
    throw new Error("Method not implemented.");
  }

}
