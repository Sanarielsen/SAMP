import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { ProcessHistoryDetailDTO } from "@shared/types/processHistoric"


export function optionsQueryListProcessHistoryWithDetails() { 
  return queryOptions({
    queryKey: ["process-history-with-details"],

    queryFn: async () => {
      const { data } = await api.get<ProcessHistoryDetailDTO[]>(`process/histories`)

      return data
    },
  })
}