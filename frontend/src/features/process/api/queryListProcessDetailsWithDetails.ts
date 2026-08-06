import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListProcessDetailsWithSearch(search: string) { 
  return queryOptions({
    queryKey: ["processes", search],
    queryFn: async () => {
      const { data } = await api.get(`processes`, {
        params: { search }
      });

      return data
    },
  })
}