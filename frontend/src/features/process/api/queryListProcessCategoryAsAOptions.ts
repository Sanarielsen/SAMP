import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"
import type { OptionsControlledBox } from "@shared/types/values"

export function optionsQueryListProcessCategoryAsAOptions() { 
  return queryOptions({
    queryKey: ["process-categories"],

    queryFn: async () => {
      const { data } = await api.get<OptionsControlledBox[]>(`/process/category/options`)

      return data
    },
  })
}