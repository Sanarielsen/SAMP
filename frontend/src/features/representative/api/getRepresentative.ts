import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsGetRepresentative(idRepresentative: string, isEnable: boolean) { 
  return queryOptions({
    queryKey: ["representatives", idRepresentative],
    enabled: isEnable,
    queryFn: async () => {
      const { data } = await api.get(`/representative/${idRepresentative}`)

      return data
    },
  })
}