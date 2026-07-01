import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryGetProcessHistory(id: string) { 
  return queryOptions({
    queryKey: ["process-history", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/process/history/${id}`)

      return data
    },
  })
}