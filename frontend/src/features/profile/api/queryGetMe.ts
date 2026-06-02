import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryGetUser() { 
  return queryOptions({
    queryKey: ["me"],

    queryFn: async () => {
      const { data } = await api.get(`/me`)

      return data
    },
  })
}