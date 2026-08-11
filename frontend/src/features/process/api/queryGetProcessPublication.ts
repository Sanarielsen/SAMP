import { api } from "@/api/axios"
import { queryOptions } from "@tanstack/react-query"

import type { ProcessPublication } from "@shared/types/processPublication"


export function optionsQueryGetProcessPublication(id: string | undefined) { 
  return queryOptions({
    queryKey: ["process-publication", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<ProcessPublication>(`/publication/${id}`)

      return data
    },
  })
}