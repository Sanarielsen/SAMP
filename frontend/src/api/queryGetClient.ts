import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryGetClient(clientId: string) { 
  return queryOptions({
    queryKey: ["client", clientId],
    enabled: !!clientId,
    queryFn: async () => {
      const { data } = await api.get(`/client/${clientId}`)

      return data
    },
  })
}