import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryGetProcessImportedDetails(id: string) { 
  return queryOptions({
    queryKey: ["process-imported", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/process/imported/${id}`)

      return data
    },
  })
}