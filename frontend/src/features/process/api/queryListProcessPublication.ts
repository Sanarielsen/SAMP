import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListProcessPublication(processId: string) { 
  return queryOptions({
    queryKey: ["process-publications", processId],
    queryFn: async () => {
      const { data } = await api.get(`process/${processId}/publications`);

      return data
    },
  })
}