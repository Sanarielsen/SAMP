import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListOrderTypesAsOptions() { 
  return queryOptions({
    queryKey: ["order-type-as-options"],

    queryFn: async () => {
      const { data } = await api.get(`/order/type/options`)

      return data
    },
  })
}