import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { OptionsControlledBox } from "@shared/types/values"


export function optionsQueryListProcessTypeAsAOptions() { 
  return queryOptions({
    queryKey: ["process-type-as-an-option"],

    queryFn: async () => {
      const { data } = await api.get<OptionsControlledBox[]>(`/process/type/options`)

      return data
    },
  })
}