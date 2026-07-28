import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { ImportedProcessFromINPI } from "@shared/types/importedProcess"


export function optionsQueryGetImportedProcessFromINPI(processNumber: string, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["imported-process", processNumber],
    enabled: !!isEnabled,
    queryFn: async () => {
      const { data } = await api.get<ImportedProcessFromINPI>(`process/inpi/${processNumber}`)

      return data
    },
  })
}