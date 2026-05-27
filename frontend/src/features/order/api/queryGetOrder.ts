import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryGetOrder(id: string, isEnable: boolean) { 
  return queryOptions({
    queryKey: ["order"],
    enabled: isEnable,
    queryFn: async () => {
      const { data } = await api.get(`/order/${id}`)

      return data
    },
  })
}