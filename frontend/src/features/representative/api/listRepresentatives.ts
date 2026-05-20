import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryClient(search: string) { 
  return queryOptions({
    queryKey: ["representatives"],

    queryFn: async () => {
      const { data } = await api.get(`/representatives`,
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