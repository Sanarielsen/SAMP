import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

import type { CreatePublicationDTO, Publication } from '@shared/types/publication'


async function postPublication(payload: CreatePublicationDTO): Promise<AxiosResponse<Publication>> {
  return await api.post(`/publication/process`, payload)
}

export function useMutationPostPublication(
  options?: UseMutationOptions<AxiosResponse<Publication>, Error, CreatePublicationDTO>
) {
  return useMutation({
    mutationFn: postPublication,
    ...options,
  })
}