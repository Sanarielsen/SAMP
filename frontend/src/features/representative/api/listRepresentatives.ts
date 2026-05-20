import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryClient(idClient: string, search: string) { 
  return queryOptions({
    queryKey: ["representatives", idClient],

    queryFn: async () => {
      const { data } = await api.get(`/client/${idClient}/representatives`,
        {
          params: {
            search,
          },
        }
      )

      return data
    },
  })
}