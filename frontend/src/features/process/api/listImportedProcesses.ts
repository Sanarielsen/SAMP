import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListImportedProcessPerMagazine(importedMagazineId: string) { 
  return queryOptions({
    queryKey: ["imported-process-per-magazine", importedMagazineId],
    enabled: !!importedMagazineId,
    queryFn: async () => {
      const { data } = await api.get(`process/imported/${importedMagazineId}/options`)

      return data
    },
  })
}