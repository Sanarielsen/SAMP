import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListAppointments(clientId: string) { 
  return queryOptions({
    queryKey: ["appointments", clientId],
    queryFn: async () => {
      const { data } = await api.get(`/client/${clientId}/appointments`)

      return data
    },
  })
}