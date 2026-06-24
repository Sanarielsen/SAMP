import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { OptionsControlledBox } from "@shared/types/values"

export function optionsQueryListUsersWithOptions() { 
  return queryOptions({
    queryKey: ["users-with-options"],

    queryFn: async () => {
      const { data } = await api.get<OptionsControlledBox[]>(`/option/users`)

      return data
    },
  })
}