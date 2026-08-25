import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

import type { ImportedProcess, ImportedProcessCreateDTO } from '@shared/types/importedProcess'


async function postImportedProcess(payload: ImportedProcessCreateDTO): Promise<AxiosResponse<ImportedProcess>> {
  return await api.post(`/process/inpi`, payload)
}

export function useMutationPostImportedProcess(
  options?: UseMutationOptions<AxiosResponse<ImportedProcess>, Error, ImportedProcessCreateDTO>
) {
  return useMutation({
    mutationFn: postImportedProcess,
    ...options,
  })
}