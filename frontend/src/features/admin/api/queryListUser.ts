import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { UserDetailsForAdminDTO } from "@shared/types/user"


export function optionsQueryListUsers(search: string) { 
  return queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<UserDetailsForAdminDTO[]>(`/admin/users`,
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