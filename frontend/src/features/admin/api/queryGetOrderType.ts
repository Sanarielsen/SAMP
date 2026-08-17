import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { OrderType } from "@shared/types/orderType"


export function optionsQueryGetOrderType(id: number, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["order-type", id],
    enabled: !!id && isEnabled,
    queryFn: async () => {
      const { data } = await api.get<OrderType | null>(`/order/type/${id}`)

      return data
    },
  })
}