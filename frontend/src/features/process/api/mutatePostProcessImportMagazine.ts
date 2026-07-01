import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'


interface PostProcessImportMagazineResponse {
  status: number
  rowsInserted: number
}

async function postProcessImportMagazine(payload: FormData): Promise<AxiosResponse<PostProcessImportMagazineResponse>> {
  return await api.post(`/process/import`, payload)
}

export function useMutationPostProcessImportMagazine(
  options?: UseMutationOptions<AxiosResponse<PostProcessImportMagazineResponse>, Error, FormData>
) {
  return useMutation({
    mutationFn: postProcessImportMagazine,
    ...options,
  })
}