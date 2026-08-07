import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"
import type { ImportedProcess } from "@shared/types/importedProcess"


export function optionsQueryGetProcess(id: string | undefined) { 
  return queryOptions({
    queryKey: ["process", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<ImportedProcess>(`/process/${id}`)

      return data
    },
  })
}