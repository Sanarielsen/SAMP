import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListPublicationDetails(search: string) { 
  return queryOptions({
    queryKey: ["publications", search],
    queryFn: async () => {
      const { data } = await api.get(`publications`, {
        params: { word: search }
      });

      return data
    },
  })
}