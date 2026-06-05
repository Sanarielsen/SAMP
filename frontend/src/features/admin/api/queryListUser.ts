import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListUsers(search: string) { 
  return queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/users`,
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