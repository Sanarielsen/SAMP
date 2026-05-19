import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


export type RepresentativeDesativatedPayload = {
  id: string
}

type RepresentativeDesativatedResponse = {
  id: string
}

async function deleteRepresentative({
  id
}: RepresentativeDesativatedPayload): Promise<RepresentativeDesativatedResponse> {
  const { data } = await api.delete(`/representative/${id}`)

  return data
}

export function useMutationDeleteRepresentative(
  options?: UseMutationOptions<RepresentativeDesativatedResponse, Error, RepresentativeDesativatedPayload>
) {
  return useMutation({
    mutationFn: deleteRepresentative,
    ...options,
  })
}