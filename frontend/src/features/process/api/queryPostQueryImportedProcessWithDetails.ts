import { queryOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { 
  ImportedProcessFilter 
} from '@shared/types/importedProcess';


interface QueryImportedProcessFromINPI {
  search: string;
  payload: ImportedProcessFilter;
  isSubmitted: boolean
}

export function optionsQueryPostQueryImportedProcessWithDetails({
  search, payload, isSubmitted 
}: QueryImportedProcessFromINPI) { 
  return queryOptions({
    queryKey: ["imported-process-with-details", payload],
    enabled: isSubmitted,
    queryFn: async () => {
      const { data } = await api.post(`/process/import/query?word=${search}`, payload)

      return data
    },
  })
}