import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { ProcessPublicationFromINPI } from "@shared/types/processPublication";


export function optionsQueryListProcessPublicationFromINPI(processNumber: string, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["process-publications-from-inpi", processNumber],
    enabled: !!isEnabled,
    queryFn: async () => {
      const { data } = await api.get<ProcessPublicationFromINPI[]>(`process/inpi/${processNumber}/publications`);

      return data
    },
  })
}

