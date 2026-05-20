import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsGetRepresentative(idRepresentative: string) { 
  return queryOptions({
    queryKey: ["representatives", idRepresentative],

    queryFn: async () => {
      const { data } = await api.get(`/representative/${idRepresentative}`)

      return data
    },
  })
}