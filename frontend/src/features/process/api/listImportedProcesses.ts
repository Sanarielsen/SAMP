import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListImportedProcessPerMagazine(importedMagazineId: string, search: string) { 
  return queryOptions({
    queryKey: ["imported-process-per-magazine", importedMagazineId || "", search],
    enabled: !!importedMagazineId,
    queryFn: async () => {
      const { data } = await api.get(`process/imported/${importedMagazineId}/options`, {
        params: { q: search }
      });

      return data
    },
  })
}