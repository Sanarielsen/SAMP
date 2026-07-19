import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryGetPublication(id: string | undefined) { 
  return queryOptions({
    queryKey: ["publication", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/publication/${id}`)

      return data
    },
  })
}