import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsGetRepresentativeWithClients(id: string, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["representatives-with-clients", id],
    enabled: isEnabled,
    queryFn: async () => {
      const { data } = await api.get(`/representative/${id}/clients`)

      return data
    },
  })
}