import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListOrderPayments(orderId: string, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["order-payments", orderId],
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await api.get(`/order/${orderId}/payments`)

      return data
    },
  })
}