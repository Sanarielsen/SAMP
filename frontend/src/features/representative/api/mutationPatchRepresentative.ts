import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { UpdateRepresentativeDTO } from '@shared/types/representative'


export type RepresentativePatchPayload = UpdateRepresentativeDTO 

async function patchRepresentative(
  payload: RepresentativePatchPayload
): Promise<void> {
  const { data } = await api.patch(`/representative/${payload.id}`, payload)

  return data
}

export function useMutationPatchRepresentative(
  options?: UseMutationOptions<void, Error, RepresentativePatchPayload>
) {
  return useMutation({
    mutationFn: patchRepresentative,
    ...options,
  })
}