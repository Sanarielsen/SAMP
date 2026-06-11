import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListOrderPayments(orderId: string) { 
  return queryOptions({
    queryKey: ["order-payments", orderId],

    queryFn: async () => {
      const { data } = await api.get(`/order/${orderId}/payments`)

      return data
    },
  })
}