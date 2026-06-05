import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"
import type { OrderWithTypeDetailDTO } from "@shared/types/orders"

export function optionsQueryGetOrderDetails(id: string, isEnable: boolean) { 
  return queryOptions({
    queryKey: ["order"],
    enabled: isEnable,
    queryFn: async () => {
      const { data } = await api.get<OrderWithTypeDetailDTO>(`/order/${id}/details`)

      return data
    },
  })
}