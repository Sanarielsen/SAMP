import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListProcessHistoricsAsAOptions() { 
  return queryOptions({
    queryKey: ["process-historic-as-a-options"] ,

    queryFn: async () => {
      const { data } = await api.get(`process/historic/options`)

      return data
    },
  })
}