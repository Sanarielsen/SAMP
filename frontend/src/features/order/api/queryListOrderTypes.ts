import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListOrderTypesWithOptions() { 
  return queryOptions({
    queryKey: ["order-types"],

    queryFn: async () => {
      const { data } = await api.get(`/order/types`)

      return data
    },
  })
}