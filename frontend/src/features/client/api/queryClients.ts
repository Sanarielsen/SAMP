import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryClient(userId: string, word: string) { 
  return queryOptions({
    queryKey: ["clients", userId],

    queryFn: async () => {
      const { data } = await api.get(`/client/user/${userId}`,
        {
          params: {
            word,
          },
        }
      )

      return data
    },
  })
}