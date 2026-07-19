import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { ProcessHistoryDetailDTO } from "@shared/types/processHistory"


export function optionsQueryListProcessHistoryWithDetails() { 
  return queryOptions({
    queryKey: ["process-history-with-details"],

    queryFn: async () => {
      const { data } = await api.get<ProcessHistoryDetailDTO[]>(`process/histories`)

      return data
    },
  })
}