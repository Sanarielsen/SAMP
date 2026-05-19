import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { CreateRepresentativeDTO } from '@shared/types/representative'


export type RepresentativePostPayload = CreateRepresentativeDTO 

async function postRepresentative(
  payload: RepresentativePostPayload
): Promise<void> {
  const { data } = await api.post('/representative', payload)

  return data
}

export function useMutationPostRepresentative(
  options?: UseMutationOptions<void, Error, RepresentativePostPayload>
) {
  return useMutation({
    mutationFn: postRepresentative,
    ...options,
  })
}