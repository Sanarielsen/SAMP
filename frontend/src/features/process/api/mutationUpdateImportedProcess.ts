import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

import type { ImportedProcess, ImportedProcessUpdateDTO } from '@shared/types/importedProcess'


async function patchProcess(payload: ImportedProcessUpdateDTO): Promise<AxiosResponse<ImportedProcess>> {
  return await api.patch(`/process/${payload.id}`, payload)
}

export function useMutationUpdateProcess(
  options?: UseMutationOptions<AxiosResponse<ImportedProcess>, Error, ImportedProcessUpdateDTO>
) {
  return useMutation({
    mutationFn: patchProcess,
    ...options,
  })
}