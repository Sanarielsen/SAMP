import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListClientsWithOptions() { 
  return queryOptions({
    queryKey: ["representatives-with-options"] ,

    queryFn: async () => {
      const { data } = await api.get(`/clients/options`)

      return data
    },
  })
}