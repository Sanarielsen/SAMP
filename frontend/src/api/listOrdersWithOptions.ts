import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { OptionsControlledBox } from "@shared/types/values"

export function optionsQueryListOrdersWithOptions(clientId: string) { 
  return queryOptions({
    queryKey: ["users-with-options"],
    enabled: !!clientId,
    queryFn: async () => {
      const { data } = await api.get<OptionsControlledBox[]>(`option/client/${clientId}/orders`)

      return data
    },
  })
}