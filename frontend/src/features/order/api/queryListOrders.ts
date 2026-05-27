import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListOrders(search: string) { 
  return queryOptions({
    queryKey: ["orders", search],

    queryFn: async () => {
      const { data } = await api.get(`/orders`,
        {
          params: {
            search,
          },
        }
      )

      return data
    },
  })
}