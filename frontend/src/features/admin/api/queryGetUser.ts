import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { UserPublicDTO } from "@shared/types/user"


export function optionsQueryGetUser(id: string) { 
  return queryOptions({
    queryKey: ["user", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<UserPublicDTO | null>(`/user/${id}`)

      return data
    },
  })
}