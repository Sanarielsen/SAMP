import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

import type { Publication, UpdatePublicationDTO } from '@shared/types/publication'


async function patchPublication(payload: UpdatePublicationDTO): Promise<AxiosResponse<Publication>> {
  return await api.patch(`/publication/${payload.id}`, payload)
}

export function useMutationPatchPublication(
  options?: UseMutationOptions<AxiosResponse<Publication>, Error, UpdatePublicationDTO>
) {
  return useMutation({
    mutationFn: patchPublication,
    ...options,
  })
}